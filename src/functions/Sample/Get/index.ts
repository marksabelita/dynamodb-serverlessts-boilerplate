import { ICustomContext } from '../../../interface/context.interface'
import { EUserType, IUserInterfaceModel } from '../../../interface/models/user.interface'
import { UserModel } from '../../../models/user.models'
import { UserService } from '../../../services/user.service'
import { success } from '../../../util/response'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'

export const getSample = async (
  _event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false

  const { logger } = context
  const user: IUserInterfaceModel = {
    contactNumber: '09499444366',
    firstName: 'mark',
    lastName: 'sabelita',
    userType: EUserType.NORMAL,
    birthday: '1994-08-06',
    city: 'Antipolo',
    province: 'Rizal',
    latitude: 14.62236,
    longitude: 121.166153,
  }

  const userModel = new UserModel(user)
  const userService = new UserService(userModel)

  const result = await userService.createUser()
  return success(logger.getTrackingCode(), 'success', { result })
}
