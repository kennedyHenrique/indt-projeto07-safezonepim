import { Router } from "express";
import AreaController from "../controllers/AreaController.js";
import AreaService from "../services/AreaService.js";
import { ColaboradorService } from "../services/ColaboradorService.js";
import { AppDataSource } from "../database/dataSource.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createAreaSchemaDTO, updateAreaSchemaDTO } from "../dtos/createAreaSchemaDTO.js";

const router = Router();

const areaService = new AreaService(AppDataSource);
const areaController = new AreaController(areaService);

router.get('/', areaController.getAll.bind(areaController));
router.get('/:id', areaController.getById.bind(areaController));
router.post('/', validateBody(createAreaSchemaDTO), areaController.create.bind(areaController));
router.put('/:id', validateBody(updateAreaSchemaDTO), areaController.update.bind(areaController));

export default router;