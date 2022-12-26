import { IDynamoDBKey } from '../interface/dynamo.interface'
import { Item } from './base.model'
import { AttributeValue } from '@aws-sdk/client-dynamodb'

export class UserModel extends Item {
  username: string
  name: string

  constructor(username: string) {
    super()
    this.username = username
  }

  static fromItem(item?: IDynamoDBKey): UserModel {
    if (!item) throw new Error('No item!')
    return new UserModel(item.username.S)
  }

  get pk(): string {
    return `USER#${this.username}`
  }

  get sk(): string {
    return `USER#${this.username}`
  }

  toItem(): Record<string, AttributeValue> {
    return {
      ...this.keys(),
      username: { S: this.username },
    }
  }
}
