import express, { Router } from 'express';
import get from '../controllers/employees/get.js';
import post from '../controllers/employees/post.js';
import zodInputValidator from '../middleware/zodInputValidator.js';
import { employeesPostInputBodyObjectSchema, employeesPatchIdValidation, employeesDeleteIdValidation } from '../schemas/employees.js';
import patchId from '../controllers/employees/patchId.js';
import checkAuth from '../middleware/checkAuth.js';
import checkRole from '../middleware/checkRole.js';
import deleteId from '../controllers/employees/deleteId.js';
import { createHandler } from '../types/requestTypes.js';

const router: Router = express.Router();

router.get('/', checkAuth, get);
router.post('/', checkAuth, checkRole('mentor'), zodInputValidator({ body: employeesPostInputBodyObjectSchema }), post);
router.patch('/:id', checkAuth, checkRole('mentor'), zodInputValidator(employeesPatchIdValidation), createHandler(patchId));
router.delete('/:id', checkAuth, checkRole('mentor'), zodInputValidator(employeesDeleteIdValidation), createHandler(deleteId));

export default router;
