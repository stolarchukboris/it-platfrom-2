import express, { Router } from 'express';
import get from '../controllers/employees/get.js';
import post from '../controllers/employees/post.js';
import zodInputValidator from '../middleware/zodInputValidator.js';
import { employeesPostInputBodyObjectSchema, employeesPatchIdValidation, employeesDeleteIdValidation } from '../schemas/employees.js';
import patchId from '../controllers/employees/patchId.js';
import checkRole from '../middleware/checkRole.js';
import deleteId from '../controllers/employees/deleteId.js';
import { createHandler } from '../types/requestTypes.js';

const router: Router = express.Router();

router.get('/', get);
router.post('/', checkRole('mentor'), zodInputValidator({ body: employeesPostInputBodyObjectSchema }), post);
router.patch('/:id', checkRole('mentor'), zodInputValidator(employeesPatchIdValidation), createHandler(patchId));
router.delete('/:id', checkRole('mentor'), zodInputValidator(employeesDeleteIdValidation), createHandler(deleteId));

export default router;
