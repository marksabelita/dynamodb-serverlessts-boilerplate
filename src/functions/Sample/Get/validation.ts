import Joi from 'joi'

export const getValidationBody = Joi.object<any>({
  id: Joi.string().required(),
})
