import express, { Router } from 'express';
import getEmployees from '../controllers/employees/get.js';
import postEmployees from '../controllers/employees/post.js';
import zodInputValidator from '../middleware/zodInputValidator.js';
import { employeesPostInputBodyObjectSchema, employeesPatchValidation } from '../types/zod/employees.js';
import patchEmployees from '../controllers/employees/patchId.js';
import { createHandler } from '../types/requestTypes.js';
import checkAuth from '../middleware/checkAuth.js';
import checkRole from '../middleware/checkRole.js';

const router: Router = express.Router();

router.get('/', checkAuth, getEmployees);
router.post('/', checkAuth, checkRole('mentor'), zodInputValidator({ body: employeesPostInputBodyObjectSchema }), postEmployees);
router.patch('/:id', checkAuth, checkRole('mentor'), zodInputValidator(employeesPatchValidation), createHandler(patchEmployees));

export default router;
