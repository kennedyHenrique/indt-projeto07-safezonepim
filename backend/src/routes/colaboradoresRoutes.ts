import ColaboradorController from '../controllers/ColaboradorController.js';
import { AppDataSource } from '../database/dataSource.js';
import { ColaboradorService } from '../services/ColaboradorService.js';
import { Router } from "express";
import { createColaboradorSchemaDTO, updateColaboradorSchemaDTO } from '../dtos/CreateColaboradorSchemaDTO.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ensureAuth } from '../middlewares/ensureAuth.js';
import {Cargo} from "../types/cargo.js"
import { ensureRole } from '../middlewares/ensureRole.js';


const router = Router();

const colaboradorService = new ColaboradorService(AppDataSource);
const colaboradorController = new ColaboradorController(colaboradorService);

//router.get('/', ensureAuth, ensureRole(Cargo.OPERADORDESEGURANCA,Cargo.GESTORDESEGURANCA,Cargo.ADMINISTRADOR),colaboradorController.getAll.bind(colaboradorController));
//router.get('/:id', ensureAuth, colaboradorController.getById.bind(colaboradorController));
//router.post('/', ensureAuth, validateBody(createColaboradorSchemaDTO), colaboradorController.create.bind(colaboradorController));
//router.put('/:id', ensureAuth, validateBody(updateColaboradorSchemaDTO), colaboradorController.update.bind(colaboradorController));

router.get('/', colaboradorController.getAll.bind(colaboradorController));
router.get('/:id', colaboradorController.getById.bind(colaboradorController));
router.post('/', validateBody(createColaboradorSchemaDTO), colaboradorController.create.bind(colaboradorController));
router.put('/:id', validateBody(updateColaboradorSchemaDTO), colaboradorController.update.bind(colaboradorController));
router.delete('/:id', colaboradorController.delete.bind(colaboradorController));

export default router;