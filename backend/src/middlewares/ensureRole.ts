import type {RequestHandler} from "express";
import type {Cargo} from "../types/cargo.js"
import {AppError} from "../errors/appError.js"


export const ensureRole = (...papeisPermitidos: Cargo[]): RequestHandler =>{
    
    return (req,res,next)=>{
        if(!req.auth){
            throw new AppError("Nao autenticado!", 401)
        }

        if(!papeisPermitidos.includes(req.auth.cargo) ) {
            throw new AppError("Nao autorizado", 403)
        }
        next();
    }
}