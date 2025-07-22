import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.username || payload.sub || null; // depends on your JWT structure
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;

      if (!exp) return false;

      const now = Math.floor(Date.now() / 1000);

      return exp > now;
    } catch (e) {
      console.error('Invalid token format', e);
      return false;
    }
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      username: username,
      password: password
    };
    return this.http.post(`${this.API_URL}/login`, body, { headers, responseType: 'text' }).pipe(
      tap((token: string) => this.setToken(token))
    );
  }

  register(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };
    return this.http.post(`${this.API_URL}/register`, body, { headers, responseType: 'text' });
  }

  logout(): void {
    this.clearToken();
  }
}
