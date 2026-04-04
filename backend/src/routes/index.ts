import { Router } from "express";
import areaRoutes from "./areaRoutes.js";



const routes = Router();

//routes.use('/auth', authRoutes);
//routes.use('/usuarios', usuariosRoutes);
routes.use('/areas', areaRoutes);
//routes.use('/colaboradores', colaboradoresRoutes);
//routes.use('/registros', registrosRoutes);