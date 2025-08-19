export interface Fazenda {
  id?: number;
  nomeFazenda: string;
  proprietario: string;
  cpfCnpj: string;
  inscricaoEstadual?: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email?: string;
  areaTotal: number;
  areaPastagem: number;
  capacidadeRebanho: number;
  tipoPropriedade: 'Própria' | 'Arrendada' | 'Parceria';
  certificacoes: string | string[];
  observacoes?: string;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export interface FazendaForm {
  nomeFazenda: string;
  proprietario: string;
  cpfCnpj: string;
  inscricaoEstadual?: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email?: string;
  areaTotal: number;
  areaPastagem: number;
  capacidadeRebanho: number;
  tipoPropriedade: 'Própria' | 'Arrendada' | 'Parceria';
  certificacoes: string | string[];
  observacoes?: string;
}
