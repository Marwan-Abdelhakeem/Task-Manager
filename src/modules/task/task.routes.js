import { Router } from 'express';
import * as taskControllers from '../task/taskController.js';
import { verifyToken } from '../middlewares/verifyToken.middlewares.js';
import { createTaskSchema, updateTaskSchema } from './task.validations.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.route('/')
    .get(taskControllers.getTasks)
    .post(verifyToken(),validate(createTaskSchema), taskControllers.createTask);

router.route('/:id')
    .put(verifyToken(),validate(updateTaskSchema), taskControllers.updateTask)
    .delete(verifyToken(),taskControllers.deleteTask);

export default router;