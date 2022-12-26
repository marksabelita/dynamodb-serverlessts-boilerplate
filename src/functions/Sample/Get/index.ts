import { ICustomContext } from '../../../interface/context.interface'
import { UserModel } from '../../../models/user.models'
import { UserService } from '../../../services/user.service'
import { success } from '../../../util/response'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'

export const getSample = async (
  _event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  const { logger } = context
  const userModel = new UserModel('marktest')
  const userService = new UserService(userModel)

  const result = await userService.createUser()
  return success(logger.getTrackingCode(), 'success', { result })
}
