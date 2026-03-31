import type { CreateAreaSchemaDTO } from '../dtos/CreateAreaSchemaDTO.js';
import { AppError } from '../errors/appError.js';
import { AreaService } from './../services/AreaService.js';
import type { Request, Response } from 'express';



export default class AreaController {
    private areaService: AreaService;

    constructor(AreaService: AreaService) {
        this.areaService = AreaService;
    }

    async getAll(req: Request, res: Response) {
        const areas = await this.areaService.getAll();
        return res.status(200).json({
            status: "sucess",
            data: areas
        });
    }

    async getByIdArea(req: Request, res: Response) {
        const id: string = req.params.id as string;
        try{  
            const area = await this.areaService.getByIdArea(id);
            return res.status(200).json();
        } catch (error) {
            if(error instanceof AppError)
            return res.status(error.statusCode).json({ message: error.message});
        }
    }

    async createArea(req: Request, res: Response) {
        const data = req.body as CreateAreaSchemaDTO;
        try{
            const area = await this.areaService.createArea(data);
            return res.status(201).json({
                status: "success",
                data: area
            });
        }catch(error){
            if(error instanceof AppError){
                return res.status(error.statusCode).json({message: error.message});
            }
        }
    }

    async updateArea(req: Request, res: Response) {
        const id: string = req.params.id as string;
        const area = await this.areaService.updateArea(id, req.body);
        return res.status(200).json({
            status: "sucess",
            data: area
        });
    }
}