import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Fazenda, FazendaForm } from '../models/fazenda.model';
import { ApiResponse } from '../../../models/pecuarista.model';

@Injectable({
  providedIn: 'root',
})
export class FazendaService {
  private fazendas: Fazenda[] = [
    {
      id: 1,
      nome: 'Fazenda Santa Maria',
      proprietario: 'João Silva',
      cnpj: '12.345.678/0001-90',
      cep: '12345-678',
      estado: 'SP',
      cidade: 'São Paulo',
      endereco: 'Rua das Flores, 123',
      areaTotal: 1000,
      areaPlantada: 800,
      observacoes: 'Fazenda especializada em gado de corte',
      dataCadastro: new Date('2024-01-15'),
      dataAtualizacao: new Date('2024-01-15'),
    },
    {
      id: 2,
      nome: 'Sítio Boa Vista',
      proprietario: 'Maria Santos',
      cep: '54321-876',
      estado: 'MG',
      cidade: 'Belo Horizonte',
      endereco: 'Av. Principal, 456',
      areaTotal: 500,
      areaPlantada: 300,
      observacoes: 'Produção de leite',
      dataCadastro: new Date('2024-02-20'),
      dataAtualizacao: new Date('2024-02-20'),
    },
  ];

  constructor() {}

  getFazendas(): Observable<ApiResponse<Fazenda[]>> {
    return of({
      success: true,
      data: this.fazendas,
    }).pipe(delay(500));
  }

  getFazendaById(id: number): Observable<ApiResponse<Fazenda>> {
    const fazenda = this.fazendas.find((f) => f.id === id);
    return of({
      success: !!fazenda,
      data: fazenda,
      message: fazenda ? 'Fazenda encontrada' : 'Fazenda não encontrada',
    }).pipe(delay(300));
  }

  createFazenda(fazendaForm: FazendaForm): Observable<ApiResponse<Fazenda>> {
    const newFazenda: Fazenda = {
      ...fazendaForm,
      id: Math.max(...this.fazendas.map((f) => f.id || 0)) + 1,
      dataCadastro: new Date(),
      dataAtualizacao: new Date(),
    };

    this.fazendas.push(newFazenda);

    return of({
      success: true,
      data: newFazenda,
      message: 'Fazenda criada com sucesso',
    }).pipe(delay(500));
  }

  updateFazenda(
    id: number,
    fazendaForm: FazendaForm
  ): Observable<ApiResponse<Fazenda>> {
    const index = this.fazendas.findIndex((f) => f.id === id);

    if (index === -1) {
      return of({
        success: false,
        message: 'Fazenda não encontrada',
      }).pipe(delay(300));
    }

    const updatedFazenda: Fazenda = {
      ...this.fazendas[index],
      ...fazendaForm,
      dataAtualizacao: new Date(),
    };

    this.fazendas[index] = updatedFazenda;

    return of({
      success: true,
      data: updatedFazenda,
      message: 'Fazenda atualizada com sucesso',
    }).pipe(delay(500));
  }

  deleteFazenda(id: number): Observable<ApiResponse<boolean>> {
    const index = this.fazendas.findIndex((f) => f.id === id);

    if (index === -1) {
      return of({
        success: false,
        message: 'Fazenda não encontrada',
      }).pipe(delay(300));
    }

    this.fazendas.splice(index, 1);

    return of({
      success: true,
      data: true,
      message: 'Fazenda excluída com sucesso',
    }).pipe(delay(500));
  }
}
