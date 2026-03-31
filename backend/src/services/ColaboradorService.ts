import type { DataSource, Repository } from "typeorm";
import { Colaborador } from "../entities/Colaborador.js";
import { AppError } from "../errors/appError.js";



export class ColaboradorService {
    private colaboradorRepository: Repository<Colaborador>;
    constructor(appDataSource: DataSource) {
        this.colaboradorRepository = appDataSource.getRepository(Colaborador);
    }

    async getAll() {
        return await this.colaboradorRepository.find();
    }

    async getById(id: string) {
        const colaborador = await this.colaboradorRepository.findOneBy({ id_colaborador: id });

        if (!colaborador) {
            throw new AppError("Colaborador nao encontrado", 404);
        }
        return colaborador;
    }

    async getByMatricula(matricula: string) {
        const colaborador = await this.colaboradorRepository.findOneBy({ matricula: matricula });
    
        if (!colaborador) {
            throw new AppError("Colaborador nao encontrado", 404);
        }
        return colaborador;

    }

    async getByNome(nome: string) {
        const colaborador = await this.colaboradorRepository.findOneBy({ nome: nome });
        if (!colaborador) {
            throw new AppError("Colaborador nao encontrado", 404);
        }
        return colaborador;
    }

    async createColaborador (data: Colaborador) {
        const colaborador = await this.getByMatricula(data.matricula);
        if (colaborador) {
            throw new AppError("Colaborador já cadastrado", 409);
        }
        const novoColaborador = await this.colaboradorRepository.create(data);
        return await this.colaboradorRepository.save(novoColaborador);
    }

    async updateColaborador(id: string, dataColaborador: Colaborador) {
        const colaborador = await this.getById(id);
        if (!colaborador) {
            throw new AppError("Colaborador não encontrado", 404);
        }
        if (dataColaborador.matricula !== undefined) {
            const colaboradorCadastrado = await this.getByMatricula(dataColaborador.matricula);
            if (colaboradorCadastrado && colaboradorCadastrado.id_colaborador !== id) {
                throw new AppError("Colaborador já cadastrado", 409);
            }
        }

        const updates = Object.fromEntries(
            Object.entries(dataColaborador).filter(([, value]) => value !== undefined)
        ) as Partial<Colaborador>;

        const colaboradorAtualizado = this.colaboradorRepository.merge(colaborador, updates);
        return await this.colaboradorRepository.save(colaboradorAtualizado);
    }

}