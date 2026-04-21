import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Colaborador } from "./Colaborador.js";
import { Area } from "./Area.js";
import { Tipo } from "../types/tipo.js";



@Entity('RegistroAcesso')
export class RegistroAcesso {

    @PrimaryGeneratedColumn("uuid")
    id_registro!: string;

    @Column({type: "text", nullable: false, unique: true})
    numero: string;

    @ManyToOne(()=> Colaborador, (id_colaborador)=>id_colaborador.registro_acessos)
    id_colaborador!: Colaborador;

    @ManyToOne(()=> Area, (id_area)=> id_area.registro_acessos)
    id_area!: Area;

    @Column({type:'enum', enum: Tipo})
    tipo!: Tipo;

    @Column({type: 'bool', nullable: false})
    autorizado!: boolean;

    @CreateDateColumn({type: "timestamptz", default: () => "CURRENT_TIMESTAMP"})
    timestamp!: Date;
    
    @Column({type:'varchar', nullable: true})
    observacao!: string | null;

    @ManyToOne(()=> Colaborador, (colaborador) => colaborador.registrados_por)
    registrado_por: Colaborador;

}
