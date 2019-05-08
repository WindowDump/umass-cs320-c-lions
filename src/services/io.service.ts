import { App, IApp } from './../app.interface'
import { ServiceMethods, SetupMethod, Params } from '@feathersjs/feathers'
import FeathersError from '@feathersjs/errors'

interface ImportStructure {
  employees: Array<{
    firstName: ''
    lastName: ''
    employeeId: ''
    email: ''
    companyId: ''
    companyName: ''
    managerId: ''
    positionTitle: ''
    startDate: ''
  }>
  positions: Array<{
    title: ''
    description: ''
    companyId: ''
    companyName: ''
    managerId: ''
    startDate: ''
    postedDate: ''
    postingExpirationDate: ''
  }>
}

interface ParamsWithUser extends Params {
  user: IApp['users']
}

// This class is used to construct the tree without making database calls or storing temporary
// fields in the database such as the managerid and employeeId which are not ObjectIds but
// rather numbers given in the datadump to reconstruct the hierarchy only.
class Position {
  title: string
  employeeId?: string
  managerId: string
  subordinates: Position[]
  companyId: string
  dbId?: string
  startDate?: string
  postingDate?: string
  postingExpirationDate?: string

  constructor(
    title: string,
    companyId: any,
    managerId: string,
    userId?: string,
    startDate?: string,
    postingDate?: string,
    postingExpirationDate?: string
  ) {
    this.title = title
    this.companyId = companyId
    this.employeeId = userId
    this.managerId = managerId
    this.subordinates = []
    this.startDate = startDate
    this.postingDate = postingDate
    this.postingExpirationDate = postingExpirationDate
  }
}

export default class IOService
  implements ServiceMethods<ImportStructure>, SetupMethod {
  private app: App = null as any
  private treeRoot?: Position = undefined

  public async create(data: ImportStructure, params: ParamsWithUser) {
    const companyId = await this.addCompany(data.employees[0].companyName)
    for (const employee of data.employees) {
      const userId = await this.addUser(
        employee.firstName,
        employee.lastName,
        employee.email
      )
      const pos = new Position(
        employee.positionTitle,
        companyId,
        employee.managerId,
        employee.employeeId
      )
      await this.addToTree(this.treeRoot, pos, userId)
    }
    for (const openPos of data.positions) {
      const pos = new Position(
        openPos.title,
        companyId,
        openPos.managerId,
        undefined,
        openPos.startDate,
        openPos.postedDate,
        openPos.postingExpirationDate
      )
      await this.addToTree(this.treeRoot, pos, undefined)
    }
    return data
  }

  public setup(app: App) {
    this.app = app
  }

  public find(_params: ParamsWithUser) {
    return Promise.reject(new FeathersError.MethodNotAllowed())
  }

  public get(_id: string, _params: ParamsWithUser) {
    return Promise.reject(new FeathersError.MethodNotAllowed())
  }

  public patch(_id: string, _data: ImportStructure, _params: ParamsWithUser) {
    return Promise.reject(new FeathersError.MethodNotAllowed())
  }

  public remove(_id: string, _params: ParamsWithUser) {
    return Promise.reject(new FeathersError.MethodNotAllowed())
  }

  public update(_id: string, _data: ImportStructure, _params: ParamsWithUser) {
    return Promise.reject(new FeathersError.MethodNotAllowed())
  }

  private async addCompany(name: string) {
    const data = await this.app.service('companies').create({ name })
    return data._id
  }

  private async addUser(first: string, last: string, email: string) {
    const data = await this.app.service('users').create({
      firstName: first,
      lastName: last,
      email,
      password: email
    })
    return data._id
  }

  private async addPosition(
    pos: Position,
    userId: string | undefined,
    parentPositionId: string | undefined
  ) {
    if (userId !== undefined) {
      const data = await this.app.service('positions').create({
        companyId: pos.companyId,
        title: pos.title,
        parentPositionId,
        hiredUserId: userId
      })
      return data._id
    } else {
      const data = await this.app.service('positions').create({
        companyId: pos.companyId,
        title: pos.title,
        parentPositionId,
        description:
          'This position was imported and does not contain a description',
        startDate: pos.startDate,
        postingDate: pos.postingDate,
        postingExpirationDate: pos.postingExpirationDate
      })
      return data._id
    }
  }

  private async addSubordinate(node: Position, subordinateId: string) {
    const data = await this.app.service('positions').get(node.dbId as string)
    data.subordinatePositionIds.push(subordinateId)
    await this.app.service('positions').patch(node.dbId as string, {
      subordinatePositionIds: data.subordinatePositionIds
    })
  }

  private async addToTree(
    node: Position | undefined,
    posToAdd: Position,
    userId: string | undefined
  ) {
    if (node) {
      if (node.employeeId === posToAdd.managerId) {
        posToAdd.dbId = await this.addPosition(posToAdd, userId, node.dbId)
        node.subordinates.push(posToAdd)
        await this.addSubordinate(node, posToAdd.dbId as string)
      } else {
        for (const sub of node.subordinates) {
          this.addToTree(sub, posToAdd, userId)
        }
      }
    } else {
      this.treeRoot = posToAdd
      posToAdd.dbId = await this.addPosition(posToAdd, userId, undefined)
    }
  }
}
