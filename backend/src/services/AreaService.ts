import type { DataSource, Repository } from "typeorm";
import { Area } from "../entities/Area.js";
import { AppError } from "../errors/appError.js";
import type { UpdateAreaSchemaDTO } from "../dtos/CreateAreaSchemaDTO.js";

export class AreaService {

    private areaRepository: Repository<Area>;

    constructor(appDataSource: DataSource) {
        this.areaRepository = appDataSource.getRepository(Area);
    }

    async getAll() {
        return await this.areaRepository.find();
    }

    async getByIdArea(id: string) {
        const area = await this.areaRepository.findOneBy({ id_area: id });

        if (!area) {
            throw new AppError("Area nao encontrada", 404);
        }
        return area;
    }

    async getByNameArea(nome: string) {
        const area = await this.areaRepository.findOneBy({ nome: nome });

        if (!area) {
            throw new AppError("Area nao encontrada", 404);
        }
        return area;
    }

    async createArea(data: Area) {
        const area = await this.getByNameArea(data.nome);
        if (area) {
            throw new AppError("Area já cadastrada", 409);
        }
        // criando hash de senhas (usar no service colaborador)
        // data.senha = await bcrypt.hash(data.senha, 8);

        const novaArea = await this.areaRepository.create(data);
        await this.areaRepository.save(novaArea);
        return novaArea;
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
