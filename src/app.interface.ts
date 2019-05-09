import { Application } from '@feathersjs/express'
export interface IApp {
  users: {
    _id: string

    firstName: string
    lastName: string
    canImportData: boolean

    email: string
    password: string

    managedCompanyId: string

    appliedPositionIds: string[]
    availablePositionIds: string[]
    hiredPositionId: string
  }

  positions: {
    _id: string

    companyId: string

    parentPositionId: string
    subordinatePositionIds: string[]

    appliedUserIds: string[]
    acceptedUserIds: string[]
    hiredUserId: string
    hiredUserAnswers: string[]

    title: string
    description: string
    payRange: string
    jobType: string

    startDate: string
    postingDate: string
    postingExpirationDate: string
  }

  companies: {
    _id: string

    name: string
    questions: string[]
  }
}

export type App = Application<IApp>
