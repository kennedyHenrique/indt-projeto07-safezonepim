import { AppDataSource } from "./../database/dataSource.js";
import { AuthService } from "./../services/AuthService.js";
import {Router} from "express";
import AuthController from "./../controllers/AuthController.js"
import { loginSchema, logoutSchema, refreshSchema } from "../dtos/AuthDTO.js";
import {validateBody} from "../middlewares/validateBody.js"

const router = Router();

const authService = new AuthService(AppDataSource);
const authController = new AuthController(authService);

router.post("/login", validateBody(loginSchema),authController.login.bind(authController));
router.post("/refresh", validateBody(refreshSchema), authController.refresh.bind(authController));
router.post("/logout", validateBody(logoutSchema), authController.logout.bind(authController));

export default router;