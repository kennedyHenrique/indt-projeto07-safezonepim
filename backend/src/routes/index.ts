import { Router } from "express";
import areaRoutes from "./areaRoutes.js";
import colaboradoresRoutes from "./colaboradoresRoutes.js";
import registroAcessoRoutes from "./registroAcessoRoutes.js";
import authRoutes from "./authRoutes.js";


const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/areas', areaRoutes);
routes.use('/colaboradores', colaboradoresRoutes);
routes.use('/registros', registroAcessoRoutes);

export default routes;