import z from "zod";
import { Tipo } from "../types/tipo.js";


export const createRegistroAcessoSchemaDTO = z.object({
    numero: z.string().trim().min(1).max(50),
    id_colaborador: z.string().uuid(),
    id_area: z.string().uuid(),
    tipo: z.nativeEnum(Tipo),
    autorizado: z.boolean(),
    timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), "Timestamp inválido"),
    observacao: z.string().trim().max(255).nullable(),
    registrado_por: z.string().uuid()
})

export const updateRegistroAcessoSchemaDTO = createRegistroAcessoSchemaDTO.partial()
export type CreateRegistroAcessoSchemaDTO = z.infer<typeof createRegistroAcessoSchemaDTO>
export type UpdateRegistroAcessoSchemaDTO = z.infer<typeof updateRegistroAcessoSchemaDTO>