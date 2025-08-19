import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  Transportador,
  TransportadorForm,
  Veiculo,
} from '../models/transportador.model';
import { ApiResponse } from '../../../models/pecuarista.model';

@Injectable({
  providedIn: 'root',
})
export class TransportadorService {
  private transportadores: Transportador[] = [
    {
      id: 1,
      razaoSocial: 'Transportes Silva Ltda',
      nomeFantasia: 'Silva Transportes',
      cnpj: '12.345.678/0001-90',
      inscricaoEstadual: '123456789',
      inscricaoMunicipal: '987654321',
      endereco: 'Rua das Indústrias, 100',
      cidade: 'Belém',
      estado: 'Pará',
      cep: '66000-000',
      telefone: '(91) 3333-3333',
      email: 'contato@silvatransportes.com',
      responsavel: 'João Silva',
      cpfResponsavel: '123.456.789-00',
      telefoneResponsavel: '(91) 99999-9999',
      tipoTransporte: 'Rodoviário',
      capacidadeCarga: 50,
      unidadeCarga: 'toneladas',
      veiculos: [
        {
          placa: 'ABC-1234',
          modelo: 'Mercedes-Benz 710',
          ano: 2020,
          capacidade: 25,
          tipo: 'Caminhão',
          status: 'Ativo',
        },
        {
          placa: 'DEF-5678',
          modelo: 'Volkswagen Delivery',
          ano: 2021,
          capacidade: 15,
          tipo: 'Caminhão',
          status: 'Ativo',
        },
      ],
      certificacoes: ['ANTT', 'SIF', 'MAPA'],
      observacoes: 'Empresa especializada em transporte de carnes',
      dataCadastro: new Date('2024-01-15'),
    },
    {
      id: 2,
      razaoSocial: 'Logística Santos Eireli',
      nomeFantasia: 'Santos Log',
      cnpj: '98.765.432/0001-10',
      inscricaoEstadual: '987654321',
      endereco: 'Av. Principal, 500',
      cidade: 'Ananindeua',
      estado: 'Pará',
      cep: '67000-000',
      telefone: '(91) 4444-4444',
      email: 'contato@santoslog.com',
      responsavel: 'Maria Santos',
      cpfResponsavel: '987.654.321-00',
      telefoneResponsavel: '(91) 88888-8888',
      tipoTransporte: 'Multimodal',
      capacidadeCarga: 100,
      unidadeCarga: 'toneladas',
      veiculos: [
        {
          placa: 'GHI-9012',
          modelo: 'Scania R440',
          ano: 2019,
          capacidade: 30,
          tipo: 'Caminhão',
          status: 'Ativo',
        },
      ],
      certificacoes: ['ANTT', 'SIF'],
      observacoes: 'Empresa com experiência em transporte refrigerado',
      dataCadastro: new Date('2024-02-20'),
    },
  ];

  constructor() {}

  getTransportadores(): Observable<Transportador[]> {
    return of(this.transportadores).pipe(delay(500));
  }

  getTransportadorById(id: number): Observable<Transportador | undefined> {
    const transportador = this.transportadores.find((t) => t.id === id);
    return of(transportador).pipe(delay(300));
  }

  createTransportador(
    transportadorForm: TransportadorForm
  ): Observable<ApiResponse<Transportador>> {
    const newTransportador: Transportador = {
      ...transportadorForm,
      id: Math.max(...this.transportadores.map((t) => t.id || 0)) + 1,
      veiculos: this.parseVeiculos(transportadorForm.veiculos),
      certificacoes:
        typeof transportadorForm.certificacoes === 'string'
          ? transportadorForm.certificacoes
              .split(',')
              .map((c) => c.trim())
              .filter((c) => c.length > 0)
          : transportadorForm.certificacoes,
      dataCadastro: new Date(),
      dataAtualizacao: new Date(),
    };

    this.transportadores.push(newTransportador);

    return of({
      success: true,
      data: newTransportador,
      message: 'Transportador cadastrado com sucesso!',
    }).pipe(delay(800));
  }

  updateTransportador(
    id: number,
    transportadorForm: TransportadorForm
  ): Observable<ApiResponse<Transportador>> {
    const index = this.transportadores.findIndex((t) => t.id === id);

    if (index === -1) {
      return of({
        success: false,
        message: 'Transportador não encontrado',
      }).pipe(delay(500));
    }

    this.transportadores[index] = {
      ...this.transportadores[index],
      ...transportadorForm,
      veiculos: this.parseVeiculos(transportadorForm.veiculos),
      certificacoes:
        typeof transportadorForm.certificacoes === 'string'
          ? transportadorForm.certificacoes
              .split(',')
              .map((c) => c.trim())
              .filter((c) => c.length > 0)
          : transportadorForm.certificacoes,
      dataAtualizacao: new Date(),
    };

    return of({
      success: true,
      data: this.transportadores[index],
      message: 'Transportador atualizado com sucesso!',
    }).pipe(delay(800));
  }

  deleteTransportador(id: number): Observable<ApiResponse<void>> {
    const index = this.transportadores.findIndex((t) => t.id === id);

    if (index === -1) {
      return of({
        success: false,
        message: 'Transportador não encontrado',
      }).pipe(delay(500));
    }

    this.transportadores.splice(index, 1);

    return of({
      success: true,
      message: 'Transportador removido com sucesso!',
    }).pipe(delay(500));
  }

  searchTransportadores(term: string): Observable<Transportador[]> {
    const filtered = this.transportadores.filter(
      (t) =>
        t.razaoSocial.toLowerCase().includes(term.toLowerCase()) ||
        t.nomeFantasia.toLowerCase().includes(term.toLowerCase()) ||
        t.cnpj.includes(term) ||
        t.responsavel.toLowerCase().includes(term.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }

  private parseVeiculos(veiculosString: string): Veiculo[] {
    if (!veiculosString) return [];

    return veiculosString
      .split(';')
      .map((veiculoStr) => {
        const [placa, modelo, ano, capacidade, tipo, status] =
          veiculoStr.split(',');
        return {
          placa: placa?.trim() || '',
          modelo: modelo?.trim() || '',
          ano: parseInt(ano?.trim()) || 0,
          capacidade: parseFloat(capacidade?.trim()) || 0,
          tipo: (tipo?.trim() as any) || 'Caminhão',
          status: (status?.trim() as any) || 'Ativo',
        };
      })
      .filter((v) => v.placa && v.modelo);
  }
}
