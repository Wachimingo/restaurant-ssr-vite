export type DBType = {
    get: Function,
    insert: Function,
    update: Function,
    delete: Function
}

export abstract class DBInterface {
    abstract get(...args: any): Object
    abstract insert(...args: any): Object
    abstract update(...args: any): Object
    abstract delete(...args: any): Object
}