import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { fa } from "zod/locales";



@Entity('Usuario')
export class Usuario{
    @PrimaryGeneratedColumn("uuid")
    id_usuario!: string;

    @Column({type:'varchar', nullable: false})
    nome!: string;

    @Column({type:'varchar', nullable:false})
    email!: string;

    @Column({type: 'varchar', nullable:false, select: false})
    senha!: string;

    @Column({type: 'varchar', unique:true, nullable:false})
    matricula!: string;

    @Column({type: 'varchar', nullable:false})
    cargo: string;

    @Column({type:'varchar', nullable:false})
    setor: string;

    @Column({type: "date", nullable:false})
    dataNascimento: Date
}