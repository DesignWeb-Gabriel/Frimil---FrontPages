export interface PesadorGado {
  id?: number;
  nomeCompleto: string;
  cpf: string;
  rg: string;
  dataNascimento: Date;
  telefone: string;
  email?: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  cargo: string;
  registroProfissional: string;
  dataAdmissao: Date;
  salario: number;
  turno: 'Manhã' | 'Tarde' | 'Noite' | 'Integral';
  especializacoes: string | string[];
  certificacoes: string | string[];
  observacoes?: string;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export interface PesadorGadoForm {
  nomeCompleto: string;
  cpf: string;
  rg: string;
  dataNascimento: Date;
  telefone: string;
  email?: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  cargo: string;
  registroProfissional: string;
  dataAdmissao: Date;
  salario: number;
  turno: 'Manhã' | 'Tarde' | 'Noite' | 'Integral';
  especializacoes: string | string[];
  certificacoes: string | string[];
  observacoes?: string;
}
