import { CustomContext } from '../../../../interface/context'
import { success } from '../../../../util/response'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../../../../util/environments'

export const postSample = async (
  _event: APIGatewayProxyEvent,
  context: CustomContext<any>
): Promise<APIGatewayProxyResult> => {
  const { logger } = context

  const eventBus = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.EVENT_BUS_ARN)
  const lessonLearnedArn = getEnvironmentVariableValue(
    ENVIRONMENT_VARIABLES.CHECK_LESSON_LEARNED_DUPLICATES_TOPIC_ARN
  )
  const websocketArn = getEnvironmentVariableValue(
    ENVIRONMENT_VARIABLES.WEBSOCKET_SEND_MESSAGE_TOPIC_ARN
  )

  return success(logger.getTrackingCode(), 'success', { eventBus, lessonLearnedArn, websocketArn })
}
