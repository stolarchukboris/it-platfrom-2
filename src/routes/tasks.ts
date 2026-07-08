import express from 'express';
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

router.get('/', zodInputValidator(tasksGetInputQueryValidation), get);
router.get('/:id', zodInputValidator(tasksGetIdInputParamsValidation), createHandler(getId));
router.post('/', checkRole('mentor'), zodInputValidator({ body: tasksPostInputBodyObjectSchema }), post);
router.patch('/:id', zodInputValidator(tasksPatchIdInputValidation), createHandler(patchId));
router.delete('/:id', checkRole('admin'), zodInputValidator(tasksDeleteIdInputValidation), createHandler(deleteId))

export default router;
