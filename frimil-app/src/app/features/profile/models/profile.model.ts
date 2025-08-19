export interface Profile {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  cargo: string;
  departamento: string;
  dataNascimento?: Date;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export interface ProfileForm {
  nome: string;
  email: string;
  telefone?: string;
  cargo: string;
  departamento: string;
  dataNascimento?: Date;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
}
