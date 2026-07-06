import express from 'express';
import zodInputValidator from '../middleware/zodInputValidator.js';
import checkRole from '../middleware/checkRole.js';
import { reviewsPostInputBodyObjectSchema } from '../schemas/reviews.js';
import post from '../controllers/reviews/post.js';

const router = express.Router();

router.post('/', checkRole('mentor'), zodInputValidator({ body: reviewsPostInputBodyObjectSchema }), post);

export default router;
