import { Colaborador } from './../entities/Colaborador.js';
import type { Repository } from "typeorm";
import { RegistroAcesso } from "../entities/RegistroAcesso.js";
import type { DataSource } from "typeorm/browser";
import type { CreateRegistroAcessoSchemaDTO, UpdateRegistroAcessoSchemaDTO } from "../dtos/CreateRegistroAcessoSchemaDTO.js";
import type { Area } from '../entities/Area.js';
import { AppError } from '../errors/appError.js';


export default class RegistroAcessoService {
    private registroAcessoRepository: Repository<RegistroAcesso>;
    colaboradorRepository: Repository<Colaborador>;
    areaRepository: Repository<Area>;

    constructor(dataSource: DataSource) {
        this.registroAcessoRepository = dataSource.getRepository(RegistroAcesso);
    }

    async getAll() {
        return await this.registroAcessoRepository.find();
    }

    async getById(id: string) {
        const registroAcesso = await this.registroAcessoRepository.findOneBy({ id_registro: id });
        if (!registroAcesso) {
            throw new AppError("Registro de Acesso não encontrado", 404);
        }
        return registroAcesso;
    }

    async getByColaboradorId(colaboradorId: string) {
        const registrosAcesso = await this.registroAcessoRepository.find({
            where: { id_colaborador: { id_colaborador: colaboradorId } }
        });
        return registrosAcesso;
    }

    async getByAreaId(areaId: string) {
        const registrosAcesso = await this.registroAcessoRepository.find({
            where: { id_area: { id_area: areaId } }
        });
        return registrosAcesso;
    }
    // como fazer quando a variavel é um enum? tipo: Tipo?
    //async getByTipo(tipo: string) {
    //    const registrosAcesso = await this.registroAcessoRepository.find({
    //        where: { tipo: tipo }
    //    });
    //    return registrosAcesso;
    //}

    async createRegistroAcesso(data: RegistroAcesso) {
        const existente = await this.getById(data.id_registro);
        if (existente) {
            throw new AppError("Registro de Acesso já existe", 409);
        }

        const colaborador = await this.colaboradorRepository.findOneBy({ id_colaborador: data.id_colaborador.id_colaborador });
        if (!colaborador) {
            throw new AppError("Colaborador não encontrado", 404);
        }

        const area = await this.areaRepository.findOneBy({ id_area: data.id_area.id_area });
        if (!area) {
            throw new AppError("Área não encontrada", 404);
        }

        const novoRegistroAcesso = this.registroAcessoRepository.create(data);
        return await this.registroAcessoRepository.save(novoRegistroAcesso);
    }

    async updateRegistroAcesso(id: string, dataRegistroAcesso: UpdateRegistroAcessoSchemaDTO) {
        const registroAcesso = await this.getById(id);
        if (!registroAcesso) {
            throw new AppError("Registro de Acesso não encontrado", 404);
        }
        if (dataRegistroAcesso.id_colaborador !== undefined) {
            const colaborador = await this.getByColaboradorId(dataRegistroAcesso.id_colaborador);
            if (!colaborador) {
                throw new AppError("Colaborador não encontrado", 404);
            }  
        }
        if (dataRegistroAcesso.id_area !== undefined) {
            const area = await this.getByAreaId(dataRegistroAcesso.id_area);
            if (!area) {
                throw new AppError("Área não encontrada", 404);
            }   
        }

        const updates = Object.fromEntries(
            Object.entries(dataRegistroAcesso).filter(([, value]) => value !== undefined)
        ) as Partial<RegistroAcesso>;
        const registroAcessoAtualizado = this.registroAcessoRepository.merge(registroAcesso, updates);
        return await this.registroAcessoRepository.save(registroAcessoAtualizado);
    }
}