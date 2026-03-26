import { DataSource } from "typeorm";
import { Colaborador } from "../entities/Colaborador.js";
import { Area } from "../entities/Area.js";
import { tr } from "zod/locales";



export const AppDataSource = new DataSource({

    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "postgres",
    entities: ['src/entities/**/*.ts'],
    synchronize: true,
    logging: false,
});