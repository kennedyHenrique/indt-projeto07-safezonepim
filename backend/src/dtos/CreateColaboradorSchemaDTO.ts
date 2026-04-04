import {z} from "zod";


export const createColaboradorSchemaDTO = z.object({
    nome: z.string().trim().min(1).max(100),
    matricula: z.string().trim().length(8, "A matricula deve ter 8 caracteres").regex(/^\d+$/, "A matricula deve conter apenas numeros"),
    cargo: z.string().trim().min(1),
    setor: z.string().trim().min(1),
    ativo: z.boolean(),
    foto_url: z.url({
        protocol: /^http?$/,
        hostname: (/^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/)
    }).nullable(),
    criado_em: z.coerce.date(),
    areas: z.array(z.string().uuid()),
    registro_acessos: z.array(z.string().uuid()),
    })

export const updateColaboradorSchemaDTO = createColaboradorSchemaDTO.partial()
export type CreateColaboradorSchemaDTO = z.infer<typeof createColaboradorSchemaDTO>
export type UpdateColaboradorSchemaDTO = z.infer<typeof updateColaboradorSchemaDTO>
