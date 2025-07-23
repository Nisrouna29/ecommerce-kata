import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
  username = '';
  password = '';
  confirmPassword = '';
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  signup() {
    this.loading.set(true);
    this.error.set(null);
    if (this.password !== this.confirmPassword) {
      this.error.set('Passwords do not match');
      this.loading.set(false);
      return;
    }
    this.authService.register(this.username, this.password).pipe(catchError((error) => {
      const message =
        error?.error?.message ||
        error?.error ||
        'An unknown error occurred';
      this.error.set(message);
      return throwError(() => new Error('register failed'));
    }),
      finalize(() => this.loading.set(false))
    )
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        }
      });
  }
  login() {
    this.router.navigate(['/login']);
  }
}
