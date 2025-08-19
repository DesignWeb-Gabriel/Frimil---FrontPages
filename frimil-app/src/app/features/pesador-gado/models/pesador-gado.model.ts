export interface PesadorGado {
  id?: number;
  nomeCompleto: string;
  cpf: string;
  email?: string;
  telefone: string;
  fazenda: string;
  responsavel: string;
  observacoes?: string;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export interface PesadorGadoForm {
  nomeCompleto: string;
  cpf: string;
  email?: string;
  telefone: string;
  fazenda: string;
  responsavel: string;
  observacoes?: string;
}
