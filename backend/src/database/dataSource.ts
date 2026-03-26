import { DataSource } from "typeorm";
import { Colaborador } from "../entities/Colaborador.js";
import { Area } from "../entities/Area.js";
import { tr } from "zod/locales";



export const AppDataSource = new DataSource({

    type: 'postgres',
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string,

    entities: ['src/entities/**/*.ts'],
    synchronize: true,
    logging: false
});