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
        return res.status(200).json(areas);
    }

    async getByIdArea(req: Request, res: Response) {
        const area = await this.areaService.getByIdArea(req.params.id);
        if (!area) {
            throw new AppError('Area não encontrada', 404);
        }
        return res.status(200).json(area);
    }

    async create(req: Request, res: Response) {
        const area = await this.areaService.createArea(req.body);
        return res.status(201).json(area);
    }

    async update(req: Request, res: Response) {
        const area = await this.areaService.updateArea(req.params.id, req.body);
        return res.status(200).json(area);
    }
}