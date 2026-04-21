import type { CreateColaboradorSchemaDTO } from "../dtos/CreateColaboradorSchemaDTO.js";
import { AppError } from "../errors/appError.js";
import type { ColaboradorService } from "../services/ColaboradorService.js";
import type { Request, Response } from "express";

export default class ColaboradorController {
    private colaboradorService: ColaboradorService;

    constructor(colaboradorService: ColaboradorService) {
        this.colaboradorService = colaboradorService;
    }

    async getAll(req: Request, res: Response) {
        const colaboradores = await this.colaboradorService.getAll();
        return res.status(200).json({
            status: "sucess",
            data: colaboradores
        });
    }

    async getById(req: Request, res: Response) {
        const id: string = req.params.id as string;
        try{  
            const colaborador = await this.colaboradorService.getById(id);
            return res.status(200).json({
                status: "success",
                data: colaborador
            });
        } catch (error) {
            if(error instanceof AppError)
            return res.status(error.statusCode).json({ message: error.message});
        }
    }

    async create(req: Request, res: Response) {
        const data = req.body as CreateColaboradorSchemaDTO;
        try{
            const colaborador = await this.colaboradorService.createColaborador(data);
            return res.status(201).json({
                status: "success",
                data: colaborador
            });
        }catch(error){
            if(error instanceof AppError){
                return res.status(error.statusCode).json({message: error.message});
            }
        }
    }

    async update(req: Request, res: Response) {
        const id: string = req.params.id as string;
        const data = req.body as CreateColaboradorSchemaDTO;
        const colaborador = await this.colaboradorService.updateColaborador(id, data);
        return res.status(200).json({
            status: "success",
            data: colaborador
        });
    }

    async delete(req: Request, res: Response) {
        const id: string = req.params.id as string;
        try {
            await this.colaboradorService.deleteColaborador(id);
            return res.status(204).send();
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
        }
    }
}