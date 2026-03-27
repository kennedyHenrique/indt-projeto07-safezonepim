 import type { DataSource, Repository } from "typeorm";
import { Area } from "../entities/Area.js";

export class AreaService {
    
    private areaRepository: Repository<Area>;

    constructor(appDataSource: DataSource){
        this.areaRepository = appDataSource.getRepository(Area);
    }

    async getAllAreas(){
        return this.areaRepository.find();
    }

    async getByIdArea(id: string){
        const area = await this.areaRepository.findBy({id_area: id});
        
        if(!area){
            throw new Error("Area not found");
        }
        return area;
    }

    async getByNameArea(nome: string){
        const area = await this.areaRepository.findBy({nome: nome});
        
        if(!area){
            throw new Error("Area not found");
        }
        return area;
    }

    async createArea(data: Area){
        const area = await this.getByNameArea(data.nome);
        if(area){
            throw new Error("Area already exists");
        }
        // criando hash de senhas (usar no service colaborador)
        // data.senha = await bcrypt.hash(data.senha, 8);

        const novaArea = await this.areaRepository.create(data);
        await this.areaRepository.save(novaArea);
        return novaArea;
    
    }    
}  
