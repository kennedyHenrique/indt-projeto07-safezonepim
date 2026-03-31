import z from "zod";
import { NivelRisco } from "../types/nivelRisco.js";
import { ca } from "zod/locales";


export const createAreaSchemaDTO = z.object({
    id_area: z.uuid(),
    nome: z.string().trim().min(1).max(100),
    descricao: z.string().trim().max(255).nullable(),
    nivel_risco: z.nativeEnum(NivelRisco),
    capacidade: z.number().int().positive(),
    responsavel_id: z.string().uuid(),
    ativa: z.boolean().default(true)
})

export const updateAreaSchemaDTO = createAreaSchemaDTO.partial()
export type CreateAreaSchemaDTO = z.infer<typeof createAreaSchemaDTO>
export type UpdateAreaSchemaDTO = z.infer<typeof updateAreaSchemaDTO>