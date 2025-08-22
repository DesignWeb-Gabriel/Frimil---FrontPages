import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';
import { User } from '../../models/pecuarista.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Verificar se há usuário salvo no localStorage (apenas no browser)
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  login(
    email: string,
    password: string
  ): Observable<{ success: boolean; user?: User; message?: string }> {
    // Simular login - substitua por chamada real à API
    return of({ email, password }).pipe(
      delay(1000),
      tap(() => {
        // Simular usuário logado
        const user: User = {
          id: 1,
          nome: 'Usuário Teste',
          email: email,
          iniciais: 'UT',
        };

        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      }),
      map(() => ({
        success: true,
        user: this.currentUserSubject.value || undefined,
      }))
    );
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  refreshToken(): Observable<boolean> {
    // Implementar refresh token se necessário
    return of(true).pipe(delay(500));
  }
}
