export interface Pecuarista {
  id?: number;
  nomeCompleto: string;
  email: string;
  cpfCnpj: string;
  cep: string;
  estado: string;
  fazenda: string;
  observacoes?: string;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export interface PecuaristaForm {
  nomeCompleto: string;
  email: string;
  cpfCnpj: string;
  cep: string;
  estado: string;
  fazenda: string;
  observacoes?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface User {
  id: number;
  nome: string;
  email: string;
  iniciais: string;
} 