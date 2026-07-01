import express, { Router } from 'express';
import getEmployees from '../controllers/getEmployees.js';
import postEmployees from '../controllers/postEmployees.js';
import zodInputValidator from '../middleware/zodInputValidator.js';
import { employeeInputBodyObjectSchema, employeePatchValidation } from '../types/zod.js';
import patchEmployees from '../controllers/patchEmployees.js';
import { createHandler } from '../types/requestTypes.js';

const router: Router = express.Router();

router.get('/', getEmployees);
router.post('/', zodInputValidator({ body: employeeInputBodyObjectSchema }), postEmployees);
router.patch('/:id', zodInputValidator(employeePatchValidation), createHandler(patchEmployees));

export default router;
