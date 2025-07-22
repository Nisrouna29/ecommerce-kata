import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private showCartSubject = new BehaviorSubject<boolean>(false);
  showCart$: Observable<boolean> = this.showCartSubject.asObservable();

  toggleCart(): void {
    this.showCartSubject.next(!this.showCartSubject.value);
  }

}
