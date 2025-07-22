import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  username = '';
  password = '';
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.loading.set(true);
    this.error.set(null);
    this.auth.login(this.username, this.password).pipe(catchError((error) => {
      const message =
        error?.error?.message || // custom error field
        error?.error ||          // plain string error response
        'An unknown error occurred';
      this.error.set(message);
      return throwError(() => new Error('Login failed'));
    }), finalize(() => this.loading.set(false))).subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    });
  }

  signup() {
    this.router.navigate(['/signup']);
  }
}
