import { Router } from 'express';
import * as categoryControllers from './categoryController.js';
import { verifyToken } from '../middlewares/verifyToken.middlewares.js';
import { CategorySchema } from './category.validations.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.use(verifyToken())

router.route('/')
    .get(categoryControllers.getCategories)
    .post(validate(CategorySchema), categoryControllers.createCategory);

router.route('/:id')
    .put(validate(CategorySchema), categoryControllers.updateCategory)
    .delete(categoryControllers.deleteCategory);

export default router;