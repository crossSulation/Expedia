
export interface MySqlConfig {
    addr: string,
    port: number,
    user: string,
    pwd : string,
    database:string,
    connectTimeout:number
}

export interface cacheConfig {
    expireDate : number,
    mongodb: MongodbConfig
}

export interface MongodbConfig {
    addr: string,
    port: number,
    user: string,
    pwd : string,
    database:string,
    connectTimeout:number
}
export default interface DBConfig {
     mysql : MySqlConfig,
     cache:cacheConfig
}

