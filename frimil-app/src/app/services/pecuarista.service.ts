import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, finalize, tap } from 'rxjs/operators';
import { Pecuarista, PecuaristaForm, ApiResponse } from '../models/pecuarista.model';
import { MockDataService } from './mock-data.service';
import { LoadingService } from '../core/services/loading.service';
import { AppStateService } from '../core/services/app-state.service';

@Injectable({
  providedIn: 'root'
})
export class PecuaristaService {
  private apiUrl = 'http://localhost:8080/api/pecuaristas';
  private useMockData = true; // Mudar para false quando backend estiver disponível

  constructor(
    private http: HttpClient, 
    private mockService: MockDataService,
    private loadingService: LoadingService,
    private appState: AppStateService
  ) { }

  // Buscar todos os pecuaristas
  getPecuaristas(): Observable<Pecuarista[]> {
    this.appState.setPecuaristasLoading(true);
    
    if (this.useMockData) {
      return this.mockService.getPecuaristas().pipe(
        tap(pecuaristas => this.appState.setPecuaristas(pecuaristas)),
        catchError(error => {
          this.appState.setPecuaristasError('Erro ao carregar pecuaristas');
          return this.handleError(error);
        }),
        finalize(() => this.appState.setPecuaristasLoading(false))
      );
    }
    
    return this.http.get<ApiResponse<Pecuarista[]>>(this.apiUrl)
      .pipe(
        retry(2),
        map(response => response.data || []),
        tap(pecuaristas => this.appState.setPecuaristas(pecuaristas)),
        catchError(error => {
          this.appState.setPecuaristasError('Erro ao carregar pecuaristas');
          return this.handleError(error);
        }),
        finalize(() => this.appState.setPecuaristasLoading(false))
      );
  }

  // Buscar pecuarista por ID
  getPecuarista(id: number): Observable<Pecuarista> {
    if (this.useMockData) {
      return this.mockService.getPecuarista(id);
    }
    return this.http.get<ApiResponse<Pecuarista>>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data!),
        catchError(this.handleError)
      );
  }

  // Criar novo pecuarista
  createPecuarista(pecuarista: PecuaristaForm): Observable<Pecuarista> {
    this.loadingService.show();
    
    if (this.useMockData) {
      return this.mockService.createPecuarista(pecuarista).pipe(
        tap(newPecuarista => this.appState.addPecuarista(newPecuarista)),
        catchError(this.handleError),
        finalize(() => this.loadingService.hide())
      );
    }
    
    return this.http.post<ApiResponse<Pecuarista>>(this.apiUrl, pecuarista)
      .pipe(
        retry(1),
        map(response => response.data!),
        tap(newPecuarista => this.appState.addPecuarista(newPecuarista)),
        catchError(this.handleError),
        finalize(() => this.loadingService.hide())
      );
  }

  // Atualizar pecuarista
  updatePecuarista(id: number, pecuarista: PecuaristaForm): Observable<Pecuarista> {
    if (this.useMockData) {
      return this.mockService.updatePecuarista(id, pecuarista);
    }
    return this.http.put<ApiResponse<Pecuarista>>(`${this.apiUrl}/${id}`, pecuarista)
      .pipe(
        map(response => response.data!),
        catchError(this.handleError)
      );
  }

  // Deletar pecuarista
  deletePecuarista(id: number): Observable<void> {
    if (this.useMockData) {
      return this.mockService.deletePecuarista(id);
    }
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`)
      .pipe(
        map(() => {}),
        catchError(this.handleError)
      );
  }

  // Buscar fazendas disponíveis
  getFazendas(): Observable<string[]> {
    if (this.useMockData) {
      return this.mockService.getFazendas();
    }
    return this.http.get<ApiResponse<string[]>>(`${this.apiUrl}/fazendas`)
      .pipe(
        map(response => response.data || []),
        catchError(this.handleError)
      );
  }

  // Exportar dados para planilha
  exportToExcel(): Observable<Blob> {
    if (this.useMockData) {
      return this.mockService.exportToExcel();
    }
    return this.http.get(`${this.apiUrl}/export`, { responseType: 'blob' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro na requisição:', error);
    return throwError(() => new Error(error.error?.message || 'Erro na comunicação com o servidor'));
  }
} 