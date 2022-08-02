import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

export function validate(schema: yup.ObjectSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body)
      return next()
    } catch (err: unknown) {
      next(err)
    }
  }
}
