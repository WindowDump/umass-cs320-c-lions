import { App, IApp } from './../app.interface'
import { ServiceMethods, SetupMethod, Params } from '@feathersjs/feathers'
import FeathersError from '@feathersjs/errors';

interface ImportStructure {
  positions: Array<{
    fieldA: string
    fieldB: number
  }>,

  employees: Array<{
    fieldA: string
    fieldB: number
  }>
}

interface ParamsWithUser extends Params {
  user: IApp['users']
}

export default class IOService implements ServiceMethods<ImportStructure>, SetupMethod {
  private app: App = null as any

  public async create(data: ImportStructure, params: ParamsWithUser) {
    // WRITE HOOK HERE
    console.log('DATA: ', data)
    console.log('PARAMS: ', params)
    return data
  }

  public setup(app: App) {
    this.app = app
  }

  public find(_params: ParamsWithUser) {
    return Promise.reject(new FeathersError.MethodNotAllowed());
  }

  public get(_id: string, _params: ParamsWithUser) {
    return Promise.reject(new FeathersError.MethodNotAllowed());
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
}