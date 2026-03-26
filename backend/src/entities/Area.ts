import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NivelRisco } from "../types/nivelRisco.js";
import { Colaborador } from "./Colaborador.js";



@Entity('Area')
export class Area{
    @PrimaryGeneratedColumn("uuid")
    id_user!: string;

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

    @Column({type: 'bool', default: true})
    ativa!: boolean;

}