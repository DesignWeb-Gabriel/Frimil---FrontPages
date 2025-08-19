import { TestBed } from '@angular/core/testing';
import { PecuaristaService } from './pecuarista.service';
import { Pecuarista, PecuaristaForm } from '../models/pecuarista.model';

describe('PecuaristaService', () => {
  let service: PecuaristaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PecuaristaService]
    });
    service = TestBed.inject(PecuaristaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return pecuaristas list', (done) => {
    service.getPecuaristas().subscribe(response => {
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      done();
    });
  });

  it('should create a new pecuarista', (done) => {
    const newPecuarista: PecuaristaForm = {
      nomeCompleto: 'João Silva',
      email: 'joao@teste.com',
      cpfCnpj: '123.456.789-00',
      cep: '12345-678',
      estado: 'SP',
      fazenda: 'Fazenda Teste',
      observacoes: 'Teste'
    };

    service.createPecuarista(newPecuarista).subscribe(response => {
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data?.nomeCompleto).toBe(newPecuarista.nomeCompleto);
      done();
    });
  });

  it('should update an existing pecuarista', (done) => {
    const updatedPecuarista: PecuaristaForm = {
      nomeCompleto: 'João Silva Atualizado',
      email: 'joao.atualizado@teste.com',
      cpfCnpj: '123.456.789-00',
      cep: '12345-678',
      estado: 'SP',
      fazenda: 'Fazenda Teste',
      observacoes: 'Teste atualizado'
    };

    service.updatePecuarista(1, updatedPecuarista).subscribe(response => {
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data?.nomeCompleto).toBe(updatedPecuarista.nomeCompleto);
      done();
    });
  });

  it('should delete a pecuarista', (done) => {
    service.deletePecuarista(1).subscribe(response => {
      expect(response.success).toBe(true);
      expect(response.data).toBe(true);
      done();
    });
  });
});
