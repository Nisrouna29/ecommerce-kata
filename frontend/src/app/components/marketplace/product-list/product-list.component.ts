import {
  Component,
  computed,
  signal,
  OnInit,
  inject,
  ChangeDetectionStrategy,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { debounceTime, distinctUntilChanged, fromEvent, map, Subscription } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectAllProducts,
  selectProductsError,
  selectProductsLoading,
} from '../../../store/product/product.selector';
import * as ProductActions from '../../../store/product/product.actions';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  store = inject(Store<AppState>);
  products = toSignal(this.store.select(selectAllProducts), {
    initialValue: [],
  });
  loading = toSignal(this.store.select(selectProductsLoading), {
    initialValue: false,
  });
  error = toSignal(this.store.select(selectProductsError), {
    initialValue: null,
  });

  private _searchInput$?: Subscription;
  searchTerm = signal('');

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  ngAfterViewInit() {
    this._searchInput$ = fromEvent<InputEvent>(this.searchInput.nativeElement, 'input')
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((val) => {
        this.searchTerm.set(val);
      });
  }

  filteredProducts = computed(() => {
    if (!this.error() && !this.loading() && this.products() && this.products().length > 0) {
      let filtered = this.products();
      // Filter by search term
      if (this.searchTerm()) {
        const term = this.searchTerm().toLowerCase();
        filtered = filtered.filter(
          (product) =>
            product.title.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term)
        );
      }

      return filtered;
    } else {
      return [];
    }
  });

  ngOnDestroy(): void {
    this._searchInput$?.unsubscribe();
  }
}
