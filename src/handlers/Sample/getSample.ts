import middy from '@middy/core'
import { getSample } from '../../functions/Sample/Get'
import { defaultMiddleware } from '../../middleware/DefaultMiddleware'

export const handler = middy(getSample).use(defaultMiddleware)
