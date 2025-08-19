import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Pecuarista, PecuaristaForm } from '../../models/pecuarista.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private pecuaristas: Pecuarista[] = [
    {
      id: 1,
      nomeCompleto: 'Pedro Alvares Cabral',
      email: 'pedro.cabral@example.com',
      cpfCnpj: '123.456.789-00',
      cep: '66000-000',
      estado: 'Belém/Pará',
      fazenda: 'Fazenda Silva',
      observacoes: 'Pecuarista experiente com 20 anos de atividade',
      dataCadastro: new Date('2024-01-15'),
      dataAtualizacao: new Date('2024-01-15')
    },
    {
      id: 2,
      nomeCompleto: 'Maria Santos Silva',
      email: 'maria.santos@example.com',
      cpfCnpj: '987.654.321-00',
      cep: '66100-000',
      estado: 'Ananindeua/Pará',
      fazenda: 'Fazenda Três Corações',
      observacoes: 'Especializada em gado leiteiro',
      dataCadastro: new Date('2024-01-10'),
      dataAtualizacao: new Date('2024-01-20')
    },
    {
      id: 3,
      nomeCompleto: 'João Carlos Oliveira',
      email: 'joao.oliveira@example.com',
      cpfCnpj: '456.789.123-00',
      cep: '66200-000',
      estado: 'Castanhal/Pará',
      fazenda: 'Fazenda Boa Vista',
      observacoes: 'Foco em gado de corte premium',
      dataCadastro: new Date('2024-01-05'),
      dataAtualizacao: new Date('2024-01-25')
    }
  ];

  private fazendas: string[] = [
    'Fazenda Silva',
    'Fazenda Três Corações',
    'Fazenda Boa Vista',
    'Fazenda São José',
    'Fazenda Santa Maria',
    'Fazenda Esperança'
  ];

  private nextId = 4;

  constructor() { }

  // Simular busca de todos os pecuaristas
  getPecuaristas(): Observable<Pecuarista[]> {
    return of([...this.pecuaristas]).pipe(delay(500));
  }

  // Simular busca de pecuarista por ID
  getPecuarista(id: number): Observable<Pecuarista> {
    const pecuarista = this.pecuaristas.find(p => p.id === id);
    if (pecuarista) {
      return of({...pecuarista}).pipe(delay(300));
    }
    return throwError(() => new Error('Pecuarista não encontrado'));
  }

  // Simular criação de novo pecuarista
  createPecuarista(pecuaristaForm: PecuaristaForm): Observable<Pecuarista> {
    const novoPecuarista: Pecuarista = {
      ...pecuaristaForm,
      id: this.nextId++,
      dataCadastro: new Date(),
      dataAtualizacao: new Date()
    };
    
    this.pecuaristas.push(novoPecuarista);
    return of({...novoPecuarista}).pipe(delay(800));
  }

  // Simular atualização de pecuarista
  updatePecuarista(id: number, pecuaristaForm: PecuaristaForm): Observable<Pecuarista> {
    const index = this.pecuaristas.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pecuaristas[index] = {
        ...this.pecuaristas[index],
        ...pecuaristaForm,
        dataAtualizacao: new Date()
      };
      return of({...this.pecuaristas[index]}).pipe(delay(600));
    }
    return throwError(() => new Error('Pecuarista não encontrado'));
  }

  // Simular exclusão de pecuarista
  deletePecuarista(id: number): Observable<void> {
    const index = this.pecuaristas.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pecuaristas.splice(index, 1);
      return of(void 0).pipe(delay(400));
    }
    return throwError(() => new Error('Pecuarista não encontrado'));
  }

  // Simular busca de fazendas
  getFazendas(): Observable<string[]> {
    return of([...this.fazendas]).pipe(delay(200));
  }

  // Simular exportação para Excel
  exportToExcel(): Observable<Blob> {
    const csvContent = this.generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return of(blob).pipe(delay(1000));
  }

  private generateCSV(): string {
    const headers = ['ID', 'Nome Completo', 'Email', 'CPF/CNPJ', 'CEP', 'Estado', 'Fazenda', 'Observações'];
    const csvRows = [headers.join(',')];
    
    this.pecuaristas.forEach(p => {
      const row = [
        p.id,
        `"${p.nomeCompleto}"`,
        p.email,
        p.cpfCnpj,
        p.cep,
        `"${p.estado}"`,
        `"${p.fazenda}"`,
        `"${p.observacoes || ''}"`
      ];
      csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
  }
}