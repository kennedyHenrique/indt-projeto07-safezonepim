// Importa enums e modelos relacionados.
//import { Status } from './status.enum';
// Importa o enum de urgencia.
import { Tipo } from './tipo.enum';
// Importa o modelo de colaborador.
import { Colaborador } from './colaborador.model';
// Importa o modelo de area.
import { Area } from './area.model';

// Define a estrutura de um registro de acesso.
export interface RegistroAcesso {
  // Id do registro.
  id_registro: string;
  // Numero de controle.
  numero: string;
  // Tipo de registro.
  tipo: Tipo;
  // Status da solicitacao
  autorizado: boolean;
  // Colaborador solicitante.
  solicitante: Colaborador;
  // Colaborador registrador.
  registrador: Colaborador;
  // Area associada.
  area: Area;
  // Data de criacao.
  timestamp: string;
}

// Define os campos para criar um registro de acesso.
export interface CreateRegistroAcessoDto {
  // Numero de controle.
  numero: string;
  // Tipo de registro.
  tipo: Tipo;
  // Id da area.
  id_area: string;
  // Id do colaborador solicitante.
  id_colaborador: string;
  // Data do registro.
  timestamp: string;
  // Id do colaborador registrador.
  registrador_por: string;
}

// Define os campos para atualizar requisicao.
export interface UpdateRegistroAcessoDto extends Partial<CreateRegistroAcessoDto> {}