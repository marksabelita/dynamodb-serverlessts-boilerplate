import middy from '@middy/core'
import warmup from '@middy/warmup'
import { LoggerMiddleware } from '../../middleware/LoggerMiddleware'
import { postSample } from '../../functions/Sample/Post'
import { SetEnvMiddleware } from '../../middleware/SetEnvMiddleware'
// import { AuthMiddleware } from '../../middleware/AuthMiddleware'
import httpErrorHandler from '@middy/http-error-handler'

const isWarmingUp = (event) => event.isWarmingUp === true

export const handler = middy(postSample)
  .use(warmup({ isWarmingUp }))
  .use(LoggerMiddleware())
  // .use(GetEnviromentSecretMiddleware())
  // .use(AuthMiddleware()) // temporary should be replaced by authorizer
  .use(SetEnvMiddleware())
  .use(httpErrorHandler())
