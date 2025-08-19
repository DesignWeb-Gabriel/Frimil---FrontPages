import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { PesadorGado, PesadorGadoForm } from '../models/pesador-gado.model';
import { ApiResponse } from '../../../models/pecuarista.model';

@Injectable({
  providedIn: 'root',
})
export class PesadorGadoService {
  private pesadores: PesadorGado[] = [
    {
      id: 1,
      nomeCompleto: 'Carlos Eduardo Silva',
      cpf: '123.456.789-00',
      rg: '12.345.678-9',
      dataNascimento: new Date('1985-03-15'),
      telefone: '(91) 99999-9999',
      email: 'carlos.silva@frimil.com',
      endereco: 'Rua das Palmeiras, 123',
      cidade: 'Belém',
      estado: 'Pará',
      cep: '66000-000',
      cargo: 'Pesador de Gado',
      registroProfissional: 'REG-001',
      dataAdmissao: new Date('2020-01-15'),
      salario: 2500.0,
      turno: 'Manhã',
      especializacoes: ['Pesagem de Bovinos', 'Controle de Qualidade'],
      certificacoes: ['Certificação MAPA', 'Treinamento SIF'],
      observacoes: 'Funcionário experiente com 5 anos de atuação',
      dataCadastro: new Date('2024-01-15'),
    },
    {
      id: 2,
      nomeCompleto: 'Ana Paula Santos',
      cpf: '987.654.321-00',
      rg: '98.765.432-1',
      dataNascimento: new Date('1990-07-22'),
      telefone: '(91) 88888-8888',
      email: 'ana.santos@frimil.com',
      endereco: 'Av. Principal, 456',
      cidade: 'Ananindeua',
      estado: 'Pará',
      cep: '67000-000',
      cargo: 'Auxiliar de Pesagem',
      registroProfissional: 'REG-002',
      dataAdmissao: new Date('2021-03-10'),
      salario: 1800.0,
      turno: 'Tarde',
      especializacoes: ['Pesagem de Suínos', 'Higiene Industrial'],
      certificacoes: ['Certificação MAPA'],
      observacoes: 'Funcionária dedicada e pontual',
      dataCadastro: new Date('2024-02-20'),
    },
  ];

  constructor() {}

  getPesadores(): Observable<PesadorGado[]> {
    return of(this.pesadores).pipe(delay(500));
  }

  getPesadorById(id: number): Observable<PesadorGado | undefined> {
    const pesador = this.pesadores.find((p) => p.id === id);
    return of(pesador).pipe(delay(300));
  }

  createPesador(
    pesadorForm: PesadorGadoForm
  ): Observable<ApiResponse<PesadorGado>> {
    const newPesador: PesadorGado = {
      ...pesadorForm,
      id: Math.max(...this.pesadores.map((p) => p.id || 0)) + 1,
      dataCadastro: new Date(),
      dataAtualizacao: new Date(),
    };

    this.pesadores.push(newPesador);

    return of({
      success: true,
      data: newPesador,
      message: 'Pesador de gado cadastrado com sucesso!',
    }).pipe(delay(800));
  }

  updatePesador(
    id: number,
    pesadorForm: PesadorGadoForm
  ): Observable<ApiResponse<PesadorGado>> {
    const index = this.pesadores.findIndex((p) => p.id === id);

    if (index === -1) {
      return of({
        success: false,
        message: 'Pesador de gado não encontrado',
      }).pipe(delay(500));
    }

    this.pesadores[index] = {
      ...this.pesadores[index],
      ...pesadorForm,
      dataAtualizacao: new Date(),
    };

    return of({
      success: true,
      data: this.pesadores[index],
      message: 'Pesador de gado atualizado com sucesso!',
    }).pipe(delay(800));
  }

  deletePesador(id: number): Observable<ApiResponse<void>> {
    const index = this.pesadores.findIndex((p) => p.id === id);

    if (index === -1) {
      return of({
        success: false,
        message: 'Pesador de gado não encontrado',
      }).pipe(delay(500));
    }

    this.pesadores.splice(index, 1);

    return of({
      success: true,
      message: 'Pesador de gado removido com sucesso!',
    }).pipe(delay(500));
  }

  searchPesadores(term: string): Observable<PesadorGado[]> {
    const filtered = this.pesadores.filter(
      (p) =>
        p.nomeCompleto.toLowerCase().includes(term.toLowerCase()) ||
        p.cpf.includes(term) ||
        p.cargo.toLowerCase().includes(term.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }
}
