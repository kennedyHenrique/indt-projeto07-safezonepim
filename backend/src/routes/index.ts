import { Router } from "express";
import areaRoutes from "./areaRoutes.js";
import colaboradoresRoutes from "./colaboradoresRoutes.js";



const routes = Router();

//routes.use('/auth', authRoutes);
//routes.use('/usuarios', usuariosRoutes);
routes.use('/areas', areaRoutes);
routes.use('/colaboradores', colaboradoresRoutes);
//routes.use('/registros', registrosRoutes);

export default routes;