import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectAllCategories } from './store/category/category.selector';
import { selectProductsLoading, selectAllProducts } from './store/product/product.selector';
import { selectCartItems } from './store/cart/cart.selector';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideMockStore()]
    }).compileComponents();

    const store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllCategories, []);
    store.overrideSelector(selectProductsLoading, false);
    store.overrideSelector(selectAllProducts, []);
    store.overrideSelector(selectCartItems, []);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'carrefour-test-technique' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('carrefour-test-technique');
  });
});
