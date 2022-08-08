import { NextFunction, Request, Response } from 'express'
import { validateSchema, ObjectSchema} from 'lib'

export function validate(schema: ObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validateSchema(schema, req.body)
      return next()
    } catch (err: unknown) {
      next(err)
    }
  }
}
