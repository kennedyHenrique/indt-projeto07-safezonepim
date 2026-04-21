import type { DataSource, Repository } from "typeorm";
import { Colaborador } from "../entities/Colaborador.js";
import { AppError } from "../errors/appError.js";
import { error } from "node:console";
import type { CreateColaboradorSchemaDTO, UpdateColaboradorSchemaDTO } from "../dtos/CreateColaboradorSchemaDTO.js";
import { hash } from "bcryptjs";
import { th } from "zod/locales";


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

    async createColaborador(data: CreateColaboradorSchemaDTO) {
        const colaborador = await this.colaboradorRepository.findOneBy({ matricula: data.matricula });
        if (colaborador) {
            throw new AppError("Colaborador já cadastrado", 409);
        }
        const senha_hash = await hash(data.senha_hash, 10);
        const areasMapped = data.areas?.map(id_area => ({ id_area: id_area }));
        const novoColaborador = this.colaboradorRepository.create({
            ...data,
            senha_hash,
            areas: areasMapped,
            registro_acessos: data.registro_acessos?.map(id_area => ({ id_registro: id_area }))
        });
        const salvo = await this.colaboradorRepository.save(novoColaborador);
        return salvo;
    }

    async updateColaborador(id: string, dataColaborador: UpdateColaboradorSchemaDTO) {
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

    async deleteColaborador(id: string) {
        const result = await this.colaboradorRepository.delete(id);

        if (result.affected === 0) {
            throw new AppError("Colaborador não encontrado", 404);
        }
    }

}