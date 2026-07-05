import type { Router } from "express";
import express from "express";
import zodInputValidator from "../middleware/zodInputValidator.js";
import { authLoginPostInputBodyObjectSchema, authRegisterPostInputBodyObjectSchema } from "../schemas/auth.js";
import postRegister from "../controllers/auth/postRegister.js";
import postLogin from "../controllers/auth/postLogin.js";
import checkAuth from "../middleware/checkAuth.js";
import getMe from "../controllers/auth/getMe.js";

const router: Router = express.Router();

router.post('/register', zodInputValidator({ body: authRegisterPostInputBodyObjectSchema }), postRegister);
router.post('/login', zodInputValidator({ body: authLoginPostInputBodyObjectSchema }), postLogin);
router.get('/me', checkAuth, getMe);

export default router;
