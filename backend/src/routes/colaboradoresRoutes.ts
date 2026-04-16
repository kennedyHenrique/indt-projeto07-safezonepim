import ColaboradorController from '../controllers/ColaboradorController.js';
import { AppDataSource } from '../database/dataSource.js';
import { ColaboradorService } from '../services/ColaboradorService.js';
import { Router } from "express";
import { createColaboradorSchemaDTO, updateColaboradorSchemaDTO } from '../dtos/CreateColaboradorSchemaDTO.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

const colaboradorService = new ColaboradorService(AppDataSource);
const colaboradorController = new ColaboradorController(colaboradorService);

router.get('/', colaboradorController.getAll.bind(colaboradorController));
router.get('/:id', colaboradorController.getById.bind(colaboradorController));
router.post('/', validateBody(createColaboradorSchemaDTO), colaboradorController.create.bind(colaboradorController));
router.put('/:id', validateBody(updateColaboradorSchemaDTO), colaboradorController.update.bind(colaboradorController));

export default router;