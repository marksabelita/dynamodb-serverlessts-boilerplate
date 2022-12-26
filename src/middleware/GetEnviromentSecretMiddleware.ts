import { HTTP_CODE } from '../interface/enums/http'
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../util/environments'
import { error } from '../util/response'
import { SecretVariables } from '../util/secrets'

export const GetEnviromentSecretMiddleware = () => {
  const before = async (request) => {
    const { logger } = request.context
    logger.info('GetEnviromentSecretMiddleware was ran.')
    const env = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.ENV)
    const secretId = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.SECRET_ID)
    const region = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.REGION_AWS)
    logger.info(`INIT-REGION, ${region}`)
    logger.info(`INIT-SECRET-ID, ${secretId}`)
    logger.info(`INIT-ENV, ${env}`)

    request.context.secrets = await SecretVariables.initiliaze(logger)
  }

  const onError = async (request) => {
    const { logger } = request.context
    logger.error(`Failed to initialize GetEnvironmentSecretMiddleware`)
    return error(
      HTTP_CODE.INTERNAL_SERVER_ERROR,
      logger.getTrackingCode(),
      request.error?.message ?? ''
    )
  }

  return {
    before,
    onError,
  }
}
