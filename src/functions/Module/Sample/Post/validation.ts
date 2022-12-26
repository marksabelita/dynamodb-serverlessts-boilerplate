import Joi from 'joi'

export const samplePostValidationBody = Joi.object<any>({
  id: Joi.string().required(),
})
