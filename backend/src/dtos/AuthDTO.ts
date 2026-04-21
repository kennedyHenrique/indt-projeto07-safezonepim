import {z} from "zod";

export const loginSchema = z.object({
    matricula: z.string().trim().min(1).max(50),
    senha: z.string().min(8)
});

export const refreshSchema = z.object({
    refreshToken: z.string().trim().min(10)
});

export const logoutSchema = refreshSchema;

export type LoginDTO = z.infer<typeof loginSchema>;
export type RefreshDTO = z.infer<typeof refreshSchema>;
export type LogoutDTO = z.infer<typeof logoutSchema>;