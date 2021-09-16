import { Router } from "express";
import { check } from "express-validator";
import { AuthController } from "../controllers/auth.controller";
const auth = Router();
const authController = new AuthController();
auth.post('/login', [check('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
check('password').isLength({ min: 8 }).trim().escape()], authController.login);
auth.post('/register', [
    check('first_name').isLength({ min: 3 }).trim().escape(),
    check('last_name').isLength({ min: 3 }).trim().escape(),
    check('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 8 }).trim().escape(),
    check('gender').isLength({ min: 1 }).trim().escape(),
], authController.register);

export default auth