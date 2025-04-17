import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, map, Observable } from "rxjs";
import { environment } from "../environments/environment";
import { LoginResponseModel, User } from "../models/auth/login-response.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
  export class AuthService {
    private readonly apiUrl =environment.api; // Ajustar para o ambiente correto
  
    constructor(private http: HttpClient, private router: Router) {}
  
    login(login: string, password: string): Observable<LoginResponseModel> {
      return this.http.post(`${this.apiUrl}/auth`, { login, password }).pipe(
        map((response: any) => {
          console.log(response);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          return response;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          throw error;
        })
      );
    }
  
    logout(): void {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  
    isAuthenticated(): boolean {
      return !!localStorage.getItem('user');
    }

    getUser(): User {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
  }