import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import get from '../controllers/tasks/get.js';
import zodInputValidator from '../middleware/zodInputValidator.js';
import { tasksDeleteIdInputValidation, tasksGetIdInputParamsValidation, tasksGetInputQueryValidation, tasksPatchIdInputValidation, tasksPostInputBodyObjectSchema } from '../schemas/tasks.js';
import getId from '../controllers/tasks/getId.js';
import checkRole from '../middleware/checkRole.js';
import post from '../controllers/tasks/post.js';
import patchId from '../controllers/tasks/patchId.js';
import { createHandler } from '../types/requestTypes.js';
import deleteId from '../controllers/tasks/deleteId.js';

const router = express.Router();

router.get('/', checkAuth, zodInputValidator(tasksGetInputQueryValidation), get);
router.get('/:id', checkAuth, zodInputValidator(tasksGetIdInputParamsValidation), createHandler(getId));
router.post('/', checkAuth, checkRole('mentor'), zodInputValidator({ body: tasksPostInputBodyObjectSchema }), post);
router.patch('/:id', checkAuth, zodInputValidator(tasksPatchIdInputValidation), createHandler(patchId));
router.delete('/:id', checkAuth, checkRole('admin'), zodInputValidator(tasksDeleteIdInputValidation), createHandler(deleteId))

export default router;
