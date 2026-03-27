import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NivelRisco } from "../types/nivelRisco.js";
import { Colaborador } from "./Colaborador.js";
import { RegistroAcesso } from "./RegistroAcesso.js";



@Entity('Area')
export class Area{
    @PrimaryGeneratedColumn("uuid")
    id_area!: string;

    @Column({type: 'varchar', nullable:false})
    nome!: string;

    @Column({type: 'varchar', nullable: true})
    descricao!: string;

    @Column({type: 'enum', enum: NivelRisco})
    nivel_risco!: NivelRisco;

    @Column({type: 'int', nullable: false})
    capacidade!: number;

    @ManyToOne( ()=> Colaborador, (responsavel_id) => responsavel_id.areas)
    responsavel_id!: Colaborador;

    @OneToMany(()=> RegistroAcesso, (area_id)=> area_id.area_id)
    registro_acessos!: RegistroAcesso[];

    @Column({type: 'bool', default: true})
    ativa!: boolean;

}
