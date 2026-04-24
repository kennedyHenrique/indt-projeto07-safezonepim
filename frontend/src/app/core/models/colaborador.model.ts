// Importa o enum de perfis.
import { Cargo } from './cargo.enum';
// Importa o modelo de setor.
import { Area } from './area.model';

// Define a estrutura do usuario retornado pela API.
export interface Colaborador {
  // Identificador unico do colaborador.
  id_colaborador: string;
  // Nome completo do colaborador.
  nome: string;
  // Email do colaborador.
  matricula: string;
  // Perfil de acesso do colaborador.
  cargo: Cargo;
  // Setor associado ao colaborador.
  areas: Area;
  // Data de criacao em string.
  criado_em: string;
}

// Define os campos para criar um colaborador.
export interface CreateColaboradorDto {
  // Nome do colaborador.
  nome: string;
  // Matricula do colaborador.
  matricula: string;
  // Senha inicial do colaborador.
  password: string;
  // Cargo do colaborador.
  cargo: Cargo;
  // Id da area associado.
  areas: string;
}

// Define os campos para atualizar um usuario.
export interface UpdateColaboradorDto {
  // Nome pode ser atualizado.
  nome?: string;
  // Matricula pode ser atualizado.
  matricula?: string;
  // Cargo pode ser atualizado.
  cargo?: Cargo;
  // Area pode ser atualizado.
  areas?: string;
}