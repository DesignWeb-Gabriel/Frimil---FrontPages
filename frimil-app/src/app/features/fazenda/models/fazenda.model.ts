export interface Fazenda {
  id?: number;
  nome: string;
  proprietario: string;
  cnpj?: string;
  cep: string;
  estado: string;
  cidade: string;
  endereco: string;
  areaTotal: number;
  areaPlantada?: number;
  observacoes?: string;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export interface FazendaForm {
  nome: string;
  proprietario: string;
  cnpj?: string;
  cep: string;
  estado: string;
  cidade: string;
  endereco: string;
  areaTotal: number;
  areaPlantada?: number;
  observacoes?: string;
}
