import z from "zod";


export const createUsuarioSchemaDTO = z.object({
    nome: z.string().trim().min(1).max(100),
    email: z.email({ pattern: z.regexes.unicodeEmail }),
    senha: z.string().min(6).refine((s) => /[A-Z]/.test(s), {
        error: 'Deve conter ao menos 1 letra maiuscula'
    }).refine((s) => /[a-z]/.test(s), {
        error: 'Deve conter ao menos 1 letra minuscula'
    }).refine((s) => /[^A-Za-z0-9]/.test(s), {
        error: 'Deve conter ao menos 1 caractere especial'
    }),
    matricula: z.string().trim().length(8, "A matricula deve ter 8 caracteres").regex(/^\d+$/, "A matricula deve conter apenas numeros"),
    cargo: z.string().trim().min(1),
    setor: z.string().trim().min(1),
    dataNascimento: z.preprocess(
        (val) => (val == undefined || val == '' ? undefined: val),
        z.string({ error: "Data de nascimento é obrigatória" })
            .min(1, 'Data de nascimento é obrigatória')
            .refine((val) => !isNaN(Date.parse(val)), "Data de nascimento inválida")
    ),
    id_usuario: z.string().uuid()
})

export const updateUsuarioSchemaDTO = createUsuarioSchemaDTO
    .omit({ senha: true})
    .partial();

export type CreateUsuarioSchemaDTO = z.infer<typeof createUsuarioSchemaDTO>
export type UpdateUsuarioSchemaDTO = z.infer<typeof updateUsuarioSchemaDTO>
