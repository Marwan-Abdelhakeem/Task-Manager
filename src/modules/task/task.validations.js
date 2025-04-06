import Joi from 'joi';

export const createTaskSchema = Joi.object({
    type: Joi.string().valid('text', 'list').required(),
    content: Joi.alternatives().try(
        Joi.string().required(),
        Joi.array().items(Joi.string().required()).required()
    ).required(),
    shared: Joi.boolean().optional(),
    category: Joi.string().required()
});

export const updateTaskSchema = Joi.object({
    type: Joi.string().valid('text', 'list').optional(),
    content: Joi.alternatives().try(
        Joi.string().optional(),
        Joi.array().items(Joi.string().optional()).optional()
    ).optional(),
    shared: Joi.boolean().optional(),
    category: Joi.string().optional()
});
