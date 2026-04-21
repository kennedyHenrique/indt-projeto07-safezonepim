import type { DataSource, Repository } from "typeorm";
import { Area } from "../entities/Area.js";
import { AppError } from "../errors/appError.js";
import type { CreateAreaSchemaDTO, UpdateAreaSchemaDTO } from "../dtos/createAreaSchemaDTO.js";
import { Colaborador } from "../entities/Colaborador.js";
import type { ColaboradorService } from "./ColaboradorService.js";

export default class AreaService {

    private areaRepository: Repository<Area>;
    private colaboradorRepository: Repository<Colaborador>;
    
    constructor(dataSource: DataSource) {
        this.areaRepository = dataSource.getRepository(Area);
        this.colaboradorRepository = dataSource.getRepository(Colaborador);
    }

    async getAll() {
        return await this.areaRepository.find({
            relations: { id_responsavel: true, registro_acessos: true }
        });
    }

    async getByIdArea(id: string) {
        return this.areaRepository.findOne({ where: { id_area: id } });
    }

    async getByNameArea(nome: string) {
        return this.areaRepository.findOne({ where: { nome: nome } });
    }

    async createArea(dataArea: CreateAreaSchemaDTO) {
        const area = await this.getByNameArea(dataArea.nome);
        if (area) {
            throw new AppError("Area já cadastrada", 409);
        }
        const colaborador = await this.colaboradorRepository.findOne({where: {id_colaborador: dataArea.id_responsavel}});
        if (!colaborador) {
            throw new AppError("Colaborador não encontrado", 404);
        }
        const novaArea = this.areaRepository.create({
            nome: dataArea.nome,
            descricao: dataArea.descricao,
            nivel_risco: dataArea.nivel_risco,
            capacidade: dataArea.capacidade,
            ativa: dataArea.ativa,
            id_responsavel: colaborador,
            registro_acessos: []
        });

        return await this.areaRepository.save(novaArea);
    }

    async updateArea(id: string, dataArea: UpdateAreaSchemaDTO) {
        const area = await this.getByIdArea(id);
        if (!area) {
            throw new AppError("Area não encontrada", 404);
        }
        if (dataArea.nome !== undefined) {
            const areaCadastrada = await this.getByNameArea(dataArea.nome);
            if (areaCadastrada && areaCadastrada.id_area !== id) {
                throw new AppError("Area já cadastrada", 409);
            }
        }

        const updates = Object.fromEntries(
            Object.entries(dataArea).filter(([, value]) => value !== undefined)
        ) as Partial<Area>;

        const areaAtualizada = this.areaRepository.merge(area, updates);
        return await this.areaRepository.save(areaAtualizada);
    }
}  
