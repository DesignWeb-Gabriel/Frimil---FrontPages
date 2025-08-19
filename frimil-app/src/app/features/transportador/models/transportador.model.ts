export interface Transportador {
  id?: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  inscricaoMunicipal?: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  responsavel: string;
  cpfResponsavel: string;
  telefoneResponsavel: string;
  tipoTransporte: 'Rodoviário' | 'Ferroviário' | 'Fluvial' | 'Multimodal';
  capacidadeCarga: number;
  unidadeCarga: 'toneladas' | 'quilos' | 'litros';
  veiculos: Veiculo[];
  certificacoes: string[];
  observacoes?: string;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export interface Veiculo {
  placa: string;
  modelo: string;
  ano: number;
  capacidade: number;
  tipo: 'Caminhão' | 'Carreta' | 'Vagão' | 'Barca';
  status: 'Ativo' | 'Manutenção' | 'Inativo';
}

export interface TransportadorForm {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  inscricaoMunicipal?: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  responsavel: string;
  cpfResponsavel: string;
  telefoneResponsavel: string;
  tipoTransporte: 'Rodoviário' | 'Ferroviário' | 'Fluvial' | 'Multimodal';
  capacidadeCarga: number;
  unidadeCarga: 'toneladas' | 'quilos' | 'litros';
  veiculos: string;
  certificacoes: string | string[];
  observacoes?: string;
}
