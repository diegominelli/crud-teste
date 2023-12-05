export interface Cliente {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  dataNascimento: string;
  renda: number;
  email: string;
  dataCadastro: string
}

export interface ClienteResponse{
  clientes: Array<Cliente>;
}