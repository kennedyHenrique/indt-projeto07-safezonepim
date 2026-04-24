// Define a estrutura de uma area.
export interface Area{
  // Identificador da area.
  id_area: string;
  // Nome da area.
  nome: string;
  // Descricao opcional da area.
  descricao?: string | null;
  // Data de criacao em string.
  created_at: string;
}

// Define os campos para criar uma area.
export interface CreateAreaDto {
  // Nome da area.
  nome: string;

  //Id do Colaborador responsavel.
  id_responsavel: string;
  
  // Descricao opcional.
  descricao?: string | null;
}

// Define os campos para atualizar uma area.
export interface UpdateAreaDto extends Partial<CreateAreaDto> {}