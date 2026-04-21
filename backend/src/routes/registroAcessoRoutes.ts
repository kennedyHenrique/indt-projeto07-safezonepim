import { Router } from 'express';
import { AppDataSource } from '../database/dataSource.js';
import RegistroAcessoController from '../controllers/RegistroAcessoController.js';
import RegistroAcessoService from '../services/RegistroAcessoService.js';



const router  = Router();

const registroAcessoService = new RegistroAcessoService(AppDataSource);
const registroAcessoController = new RegistroAcessoController(registroAcessoService);

router.get('/', registroAcessoController.getAll.bind(registroAcessoController));
router.get('/:id', registroAcessoController.getById.bind(registroAcessoController));
router.post('/', registroAcessoController.create.bind(registroAcessoController));
router.put('/:id', registroAcessoController.update.bind(registroAcessoController));

export default router;