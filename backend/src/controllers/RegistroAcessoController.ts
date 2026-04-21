import type { CreateRegistroAcessoSchemaDTO } from "../dtos/CreateRegistroAcessoSchemaDTO.js";
import type RegistroAcessoService from "../services/RegistroAcessoService.js";
import type { Request, Response } from "express";

export default class RegistroAcessoController {
    private registroAcessoService: RegistroAcessoService;

    constructor(registroAcessoService: RegistroAcessoService) {
        this.registroAcessoService = registroAcessoService;
    }

    async getAll(req: Request, res: Response) {
        const registrosAcesso = await this.registroAcessoService.getAll();
        return res.status(200).json({
            status: "sucess",
            data: registrosAcesso
        });
    }

    async getById(req: Request, res: Response) {
        const id: string = req.params.id as string; 
        try{
            const registroAcesso = await this.registroAcessoService.getById(id);
            return res.status(200).json({
                status: "success",
                data: registroAcesso
            });
        } catch (error) {
            return res.status(404).json({ message: "Registro de acesso não encontrado" });

        }
    }

    async create(req: Request, res: Response) {
        const data = req.body as CreateRegistroAcessoSchemaDTO;
        try{
            const registroAcesso = await this.registroAcessoService.createRegistroAcesso(data);
            return res.status(201).json({
                status: "success",
                data: registroAcesso
            });
        }catch(error){
            console.log(error);
            return res.status(400).json({ message: "Erro ao criar registro de acesso" });
        }
    }

    async update(req: Request, res: Response) {
        const id: string = req.params.id as string;
        const data = req.body;
        return res.status(200).json({
            status: "sucess",
            data: await this.registroAcessoService.updateRegistroAcesso(id, data)
        });
    }
}