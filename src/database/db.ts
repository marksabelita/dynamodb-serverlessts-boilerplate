import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
const client = null
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../util/environments'

export const getClient = (): DynamoDBClient => {
  if (client) return client
  const offlineVar = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.IS_OFFLINE)
  const endpoint = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.DYNAMODB_LOCAL_ENDPOINT)
  const region = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.REGION)
  const isOffline = offlineVar.toLowerCase() === 'true'

  if (isOffline) {
    return new DynamoDBClient({
      region,
      endpoint,
    })
  }

  return new DynamoDBClient({ region })
}
