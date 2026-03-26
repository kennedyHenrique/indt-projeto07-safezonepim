import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity('Colaborador')
export class Colaborador{
    @PrimaryGeneratedColumn("uuid")
    id_user!: string;
    
    @Column({type: 'varchar', nullable: false})
    nome!: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    matricula!: string;

    @Column({type:'varchar', nullable:false})
    setor!: string;

    @Column({type: 'bool', default: true})
    ativo!: boolean;

    @Column({type:'varchar', nullable:true})
    foto_url!: string

    @CreateDateColumn({type: "timestamptz"})
    criado_em!: Date;
    
    @OneToMany(() => Area, (areas) => areas.responsavel_id)
    areas!: Area[];
}