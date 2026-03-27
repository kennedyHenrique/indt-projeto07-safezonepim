import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Colaborador } from "./Colaborador.js";
import { Area } from "./Area.js";
import { Tipo } from "../types/tipo.js";



@Entity('RegistroAcesso')
export class RegistroAcesso {

    @PrimaryGeneratedColumn("uuid")
    id_registro!: string;

    @ManyToOne(()=> Colaborador, (colaborador_id)=>colaborador_id.registro_acessos)
    colaborador_id!: Colaborador;

    @ManyToOne(()=> Area, (area_id)=> area_id.registro_acessos)
    area_id!: Area;

    @Column({type:'enum', enum: Tipo})
    tipo!: Tipo;

    @Column({type: 'bool', nullable: false})
    autorizado!: boolean;

    @CreateDateColumn({type: "timestamptz", default: () => "CURRENT_TIMESTAMP"})
    timestamp!: Date;
    

    @ManyToOne(()=> Colaborador, (registrado_por)=>registrado_por.registros_feitos)
    registrado_por!: Colaborador;

    @Column({type:'varchar', nullable: true})
    oservacao!: string;
}
