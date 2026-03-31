import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./Area.js";
import { RegistroAcesso } from "./RegistroAcesso.js";



@Entity('Colaborador')
export class Colaborador{
    @PrimaryGeneratedColumn("uuid")
    id_colaborador!: string;
    
    @Column({type: 'varchar', nullable: false})
    nome!: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    matricula!: string;

    @Column({type:'varchar', nullable:false})
    cargo: string;

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

    @OneToMany(()=> RegistroAcesso, (id_colaborador)=> id_colaborador.id_colaborador)
    registro_acessos!: RegistroAcesso[];


}
