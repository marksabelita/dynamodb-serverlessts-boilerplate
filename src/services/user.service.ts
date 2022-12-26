import { getClient } from '../database/db'
import { UserModel } from '../models/user.models'
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../util/environments'
import { PutItemCommand } from '@aws-sdk/client-dynamodb'

export class UserService {
  user: UserModel

  constructor(user: UserModel) {
    this.user = user
  }

  createUser = async (): Promise<UserModel> => {
    const client = getClient()
    const tableName = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.DYNAMODB_TABLE_NAME)

    try {
      const putItemData = {
        TableName: tableName,
        Item: this.user.toItem(),
        ConditionExpression: 'attribute_not_exists(PK)',
      }

      await client.send(new PutItemCommand(putItemData))
      return this.user
    } catch (error) {
      /* eslint-disable no-console */
      console.log(error)
      throw error
    }
  }
}
