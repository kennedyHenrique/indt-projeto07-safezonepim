import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Colaborador } from "./Colaborador.js";



@Entity("Sessao")
export class Sessao {
    
    @PrimaryGeneratedColumn("uuid")
    id_sessao!: string;

    @ManyToOne(() => Colaborador, (colaborador)=> colaborador.sessoes, {onDelete: "CASCADE"})
    colaborador: Colaborador;

    @Column({type: "text", nullable: false})
    refresh_token_hash!: string;

    @Column({type: "timestamptz", nullable: false})
    expires_at!: Date;

    @Column({type: "text", nullable: false})
    revoked_at?: Date | null;

    @Column({type: "text", nullable: true})
    ip?: string | null;

    @Column({type: "text", nullable: true})
    user_agent?: string | null;

    @CreateDateColumn({type:"timestamptz"})
    created_at!: Date;
}