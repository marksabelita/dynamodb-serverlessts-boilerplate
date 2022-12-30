export enum EUserType {
  NORMAL = 'normal',
  TALENT = 'talent',
}

export interface IUserInterfaceModel {
  contactNumber: string
  firstName: string
  lastName: string
  userType: EUserType
  birthday: string
  skills?: string
  experienceDetails?: string
  yearStarted?: string
  totalRating?: string
  city?: string
  province?: string
  latitude: number
  longitude: number
}
