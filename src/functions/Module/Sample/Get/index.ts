import { CustomContext } from '../../../../interface/context'
import { success } from '../../../../util/response'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
// import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../../../../util/environments'

export const getSample = async (
  _event: APIGatewayProxyEvent,
  context: CustomContext<any>
): Promise<APIGatewayProxyResult> => {
  const { logger } = context

  return success(logger.getTrackingCode(), 'success', { test: 'test' })
}
