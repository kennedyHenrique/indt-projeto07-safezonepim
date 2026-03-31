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

    @ManyToOne( ()=> Colaborador, (id_responsavel) => id_responsavel.areas)
    id_responsavel!: Colaborador;

    @OneToMany(()=> RegistroAcesso, (id_area)=> id_area.id_area)
    registro_acessos!: RegistroAcesso[];

    @Column({type: 'bool', default: true})
    ativa!: boolean;

}
