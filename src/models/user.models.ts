import { IUserInterfaceModel } from '../interface/models/user.interface'
import { Item } from './base.model'
import { AttributeValue } from '@aws-sdk/client-dynamodb'

export class UserModel extends Item {
  user: IUserInterfaceModel

  constructor(user: IUserInterfaceModel) {
    super()
    this.user = user
  }

  static fromItem(item: IUserInterfaceModel): UserModel {
    if (!item) throw new Error('No item!')
    return new UserModel(item)
  }

  get pk(): string {
    return `USER#${this.user.contactNumber}`
  }

  get sk(): string {
    return `USER#${this.user.contactNumber}`
  }

  getUser(): IUserInterfaceModel {
    return this.user
  }

  toItem(): Record<string, AttributeValue> {
    return {
      ...this.keys(),
      contactNumber: { S: this.user.contactNumber },
      firstName: { S: this.user.firstName },
      lastName: { S: this.user.lastName },
      userType: { S: this.user.userType },
      birthday: { S: this.user.birthday },
      city: { S: this.user.city },
      province: { S: this.user.province },
      latitude: { N: this.user.latitude.toString() },
      longitude: { N: this.user.longitude.toString() },
    }
  }
}
