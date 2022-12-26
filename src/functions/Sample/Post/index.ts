import { ICustomContext } from '../../../interface/context.interface'
import { success } from '../../../util/response'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
// import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../../../../util/environments'

export const postSample = async (
  _event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  const { logger } = context
  return success(logger.getTrackingCode(), 'success', {})
}
