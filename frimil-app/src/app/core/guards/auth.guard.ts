import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppStateService } from '../services/app-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private appStateService: AppStateService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    // Aqui você pode implementar a lógica de verificação de autenticação
    // Por enquanto, vamos simular que o usuário está autenticado
    return this.appStateService.appState$.pipe(
      map(state => {
        // Simular verificação de autenticação
        const isAuthenticated = true; // Substitua por sua lógica real
        
        if (isAuthenticated) {
          return true;
        } else {
          // Redirecionar para login se não estiver autenticado
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
