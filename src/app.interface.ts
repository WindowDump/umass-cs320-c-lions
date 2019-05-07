import { Application } from '@feathersjs/express'

/*
  You can (but don't need to) specify your services' data types in here.
  If you do, TypeScript can infer the return types of service methods.

  example:

  export type App = Application<{users: User}>;

  app.service('users').get(1).then(user => {
    user = 5; // this won't compile, because user is known to be of type User
  });
 */
export interface IApp {
  users: {
    firstName: string
    lastName: string
    canImportData: boolean

    email: string
    password: string

    managedCompanyId: string

    appliedPositionIds: string[]
    availablePositionIds: []
  }

  positions: {
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
    name: string
    questions: string[]
  }
}

export type App = Application<IApp>
