import express from 'express';
import zodInputValidator from '../middleware/zodInputValidator.js';
import checkRole from '../middleware/checkRole.js';
import { reviewsGetIdInputParamsValidation, reviewsPostInputBodyObjectSchema } from '../schemas/reviews.js';
import post from '../controllers/reviews/post.js';
import getId from '../controllers/reviews/getId.js';
import { createHandler } from '../types/requestTypes.js';
import getEmployeesId from '../controllers/reviews/getEmployeeId.js';

const router = express.Router();

router.post('/', checkRole('mentor'), zodInputValidator({ body: reviewsPostInputBodyObjectSchema }), post);
router.get('/:id', zodInputValidator(reviewsGetIdInputParamsValidation), createHandler(getId));
router.get('/employee/:id', zodInputValidator(reviewsGetIdInputParamsValidation), createHandler(getEmployeesId))

export default router;
