import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/user/login';

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<any> {
    const requestBody = { email, password };
    return this.http.post<any>(this.apiUrl, requestBody);
  }
}
