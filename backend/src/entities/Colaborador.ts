import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./Area.js";
import { RegistroAcesso } from "./RegistroAcesso.js";
import { Cargo } from "../types/cargo.js";
import { Sessao } from "./Sessao.js";



@Entity('Colaborador')
export class Colaborador{
    @PrimaryGeneratedColumn("uuid")
    id_colaborador!: string;
    
    @Column({type: 'varchar', nullable: false})
    nome!: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    matricula!: string;

    @Column({type: 'text', nullable: false, select: false})
    senha_hash!: string ;

    @Column({type: 'enum', enum: Cargo, nullable:false})
    cargo!: Cargo;

    @Column({type:'varchar', nullable:false})
    setor!: string;

    @Column({type: 'bool', default: true})
    ativo!: boolean;

    @Column({type:'varchar', nullable:true})
    foto_url!: string | null;

    @CreateDateColumn({type: "timestamptz"})
    criado_em!: Date;
    
    @OneToMany(() => Area, (areas) => areas.id_responsavel)
    areas!: Area[];

    @OneToMany(()=> RegistroAcesso, (registro)=> registro.id_colaborador)
    registro_acessos!: RegistroAcesso[];

    @OneToMany(()=> RegistroAcesso, (registro) => registro.registrado_por)
    registrados_por!: RegistroAcesso[];

    @OneToMany(()=> Sessao, (s)=> s.colaborador)
    sessoes!: Sessao[];
}
