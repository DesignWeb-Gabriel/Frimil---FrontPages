import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Erro desconhecido';
        let errorTitle = 'Erro';

        if (error.error instanceof ErrorEvent) {
          // Erro do lado do cliente
          errorMessage = error.error.message;
          errorTitle = 'Erro de Conexão';
        } else {
          // Erro do lado do servidor
          switch (error.status) {
            case 400:
              errorTitle = 'Dados Inválidos';
              errorMessage = error.error?.message || 'Verifique os dados enviados';
              break;
            case 401:
              errorTitle = 'Não Autorizado';
              errorMessage = 'Você precisa fazer login para acessar este recurso';
              break;
            case 403:
              errorTitle = 'Acesso Negado';
              errorMessage = 'Você não tem permissão para realizar esta ação';
              break;
            case 404:
              errorTitle = 'Não Encontrado';
              errorMessage = 'O recurso solicitado não foi encontrado';
              break;
            case 422:
              errorTitle = 'Dados Inválidos';
              errorMessage = error.error?.message || 'Verifique os dados enviados';
              break;
            case 500:
              errorTitle = 'Erro do Servidor';
              errorMessage = 'Erro interno do servidor. Tente novamente mais tarde';
              break;
            default:
              errorTitle = `Erro ${error.status}`;
              errorMessage = error.error?.message || error.message;
          }
        }

        // Mostrar notificação de erro
        this.notificationService.showError(errorTitle, errorMessage);

        console.error('HTTP Error:', {
          status: error.status,
          message: errorMessage,
          url: error.url,
          error: error.error
        });

        return throwError(() => error);
      }),
      finalize(() => {
        // Esconder loading quando a requisição terminar (sucesso ou erro)
        this.loadingService.hide();
      })
    );
  }
}
