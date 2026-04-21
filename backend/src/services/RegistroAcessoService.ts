import { Colaborador } from './../entities/Colaborador.js';
import { RegistroAcesso } from "../entities/RegistroAcesso.js";
import { AppError } from '../errors/appError.js';
import  { Area } from '../entities/Area.js';
import type { DataSource, Repository } from "typeorm";
import type { CreateRegistroAcessoSchemaDTO, UpdateRegistroAcessoSchemaDTO } from "../dtos/CreateRegistroAcessoSchemaDTO.js";


export default class RegistroAcessoService {
    private registroAcessoRepository: Repository<RegistroAcesso>;
    private colaboradorRepository: Repository<Colaborador>;
    private areaRepository: Repository<Area>;

    constructor(dataSource: DataSource) {
        this.registroAcessoRepository = dataSource.getRepository(RegistroAcesso);
        this.colaboradorRepository = dataSource.getRepository(Colaborador);
        this.areaRepository = dataSource.getRepository(Area);
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

    async getByNumero(numero: string) {
        return await this.registroAcessoRepository.findOneBy({ numero: numero });
        }

    async getByColaboradorMatricula(matricula: string){
        const colaborador = await this.colaboradorRepository.findOneBy({ matricula: matricula });
        if (!colaborador) {
            throw new AppError("Colaborador nao encontrado", 404);
        }
        return colaborador.registro_acessos;
    }

    async getByColaboradorNome(nome: string){
        const colaborador = await this.colaboradorRepository.findOneBy({ nome: nome });
        if (!colaborador) {
            throw new AppError("Colaborador nao encontrado", 404);
        }
        return colaborador.registro_acessos;
    }

    async createRegistroAcesso(data: CreateRegistroAcessoSchemaDTO) {
        const existente = await this.getByNumero(data.numero);
        if (existente) {
            throw new AppError("Registro de Acesso já existe", 409);
        }

        const colaborador = await this.colaboradorRepository.findOne({where: {id_colaborador: data.id_colaborador}});
        if (!colaborador) {
            throw new AppError("Colaborador não encontrado", 404);
        }

        const area = await this.areaRepository.findOne({ where: {id_area: data.id_area }});
        if (!area) {
            throw new AppError("Área não encontrada", 404);
        }
        
        const colaboradorRegistrador = await this.colaboradorRepository.findOneBy({ id_colaborador: data.registrado_por });
        if (!colaboradorRegistrador) {
            throw new AppError("Colaborador registrador não encontrado", 404);
        }

        const novoRegistroAcesso = this.registroAcessoRepository.create({
            numero: data.numero,
            id_colaborador: colaborador,
            id_area: area,
            tipo: data.tipo,
            autorizado: data.autorizado,
            timestamp: new Date(data.timestamp),
            observacao: data.observacao,
            registrado_por: colaboradorRegistrador
        });
        return await this.registroAcessoRepository.save(novoRegistroAcesso);
    }

    async updateRegistroAcesso(id: string, dataRegistroAcesso: UpdateRegistroAcessoSchemaDTO) {
        const registroAcesso = await this.getById(id);
        if (!registroAcesso) {
            throw new AppError("Registro de Acesso não encontrado", 404);
        }
        if (dataRegistroAcesso.id_colaborador !== undefined) {
            const colaborador = await this.colaboradorRepository.findOneBy({ id_colaborador: dataRegistroAcesso.id_colaborador });
            if (!colaborador) {
                throw new AppError("Colaborador não encontrado", 404);
            }  
        }
        if (dataRegistroAcesso.id_area !== undefined) {
            const area = await this.areaRepository.findOneBy({ id_area: dataRegistroAcesso.id_area });
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