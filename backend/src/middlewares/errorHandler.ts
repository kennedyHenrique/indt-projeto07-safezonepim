import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/appError.js";
import { ZodError } from "zod";


export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            details: err.details
        });
    }

    if(err instanceof ZodError) {
        return res.status(400).json({
            message: 'Dados inválidos',
            details: err.flatten()
        });
    }

    console.error(err);
    return res.status(500).json({ message: 'Erro interno' });
};