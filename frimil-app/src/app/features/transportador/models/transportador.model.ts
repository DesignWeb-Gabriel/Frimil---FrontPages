export interface Transportador {
  id?: number;
  nomeCompleto: string;
  cpfCnpj: string;
  email?: string;
  telefone: string;
  placaVeiculo: string;
  modeloVeiculo: string;
  capacidadeCarga: number;
  observacoes?: string;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export interface TransportadorForm {
  nomeCompleto: string;
  cpfCnpj: string;
  email?: string;
  telefone: string;
  placaVeiculo: string;
  modeloVeiculo: string;
  capacidadeCarga: number;
  observacoes?: string;
}
