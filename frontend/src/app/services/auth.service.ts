import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/user/login';
  public isAuthenticatedValue = false;

  constructor(private http: HttpClient, private router: Router) {}

  get isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }

  setAuthenticated(status: boolean): void {
    this.isAuthenticatedValue = status;
    console.log('Authenticated Status:', this.isAuthenticatedValue);
  }

  signIn(email: string, password: string): Observable<any> {
    const requestBody = { email, password };
    return this.http.post<any>(this.apiUrl, requestBody);
  }

  logout(): void {
    this.setAuthenticated(false);
    this.router.navigate(['/home']);
  }
}
