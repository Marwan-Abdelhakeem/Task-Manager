import { AppError } from "../../../utils/error.js"

export const validate = (schema) => (req, res, next ) => {
    const { error } = schema.validate(req.body, {abortEarly: false})

    if (error)
        throw new AppError(
            error.details.map(({ message }) => message),
            400
        )
    next()
}