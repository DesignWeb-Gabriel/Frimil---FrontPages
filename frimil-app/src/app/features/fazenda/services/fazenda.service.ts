import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Fazenda, FazendaForm } from '../models/fazenda.model';
import { ApiResponse } from '../../../models/pecuarista.model';

@Injectable({
  providedIn: 'root',
})
export class FazendaService {
  private fazendas: Fazenda[] = [
    {
      id: 1,
      nomeFazenda: 'Fazenda Boa Vista',
      proprietario: 'João Silva',
      cpfCnpj: '123.456.789-00',
      inscricaoEstadual: '123456789',
      endereco: 'Rodovia BR-316, Km 45',
      cidade: 'Belém',
      estado: 'Pará',
      cep: '66000-000',
      telefone: '(91) 99999-9999',
      email: 'joao@fazendaboavista.com',
      areaTotal: 5000,
      areaPastagem: 3500,
      capacidadeRebanho: 2000,
      tipoPropriedade: 'Própria',
      certificacoes: ['SISBOV', 'GAP'],
      observacoes: 'Fazenda certificada para exportação',
      dataCadastro: new Date('2024-01-15'),
    },
    {
      id: 2,
      nomeFazenda: 'Sítio São José',
      proprietario: 'Maria Santos',
      cpfCnpj: '987.654.321-00',
      endereco: 'Estrada Municipal, S/N',
      cidade: 'Ananindeua',
      estado: 'Pará',
      cep: '67000-000',
      telefone: '(91) 88888-8888',
      areaTotal: 1200,
      areaPastagem: 800,
      capacidadeRebanho: 500,
      tipoPropriedade: 'Arrendada',
      certificacoes: ['SISBOV'],
      observacoes: 'Propriedade arrendada por 5 anos',
      dataCadastro: new Date('2024-02-20'),
    },
  ];

  constructor() {}

  getFazendas(): Observable<Fazenda[]> {
    return of(this.fazendas).pipe(delay(500));
  }

  getFazendaById(id: number): Observable<Fazenda | undefined> {
    const fazenda = this.fazendas.find((f) => f.id === id);
    return of(fazenda).pipe(delay(300));
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
      message: 'Fazenda cadastrada com sucesso!',
    }).pipe(delay(800));
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
      }).pipe(delay(500));
    }

    this.fazendas[index] = {
      ...this.fazendas[index],
      ...fazendaForm,
      dataAtualizacao: new Date(),
    };

    return of({
      success: true,
      data: this.fazendas[index],
      message: 'Fazenda atualizada com sucesso!',
    }).pipe(delay(800));
  }

  deleteFazenda(id: number): Observable<ApiResponse<void>> {
    const index = this.fazendas.findIndex((f) => f.id === id);

    if (index === -1) {
      return of({
        success: false,
        message: 'Fazenda não encontrada',
      }).pipe(delay(500));
    }

    this.fazendas.splice(index, 1);

    return of({
      success: true,
      message: 'Fazenda removida com sucesso!',
    }).pipe(delay(500));
  }

  searchFazendas(term: string): Observable<Fazenda[]> {
    const filtered = this.fazendas.filter(
      (f) =>
        f.nomeFazenda.toLowerCase().includes(term.toLowerCase()) ||
        f.proprietario.toLowerCase().includes(term.toLowerCase()) ||
        f.cpfCnpj.includes(term)
    );
    return of(filtered).pipe(delay(300));
  }
}
