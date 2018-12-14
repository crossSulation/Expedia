
export interface MySqlConfig {
    addr_container: string, // addr for docker container
    addr_local:string, // addr for local debug
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
    addr_container: string,// addr for docker container
    addr_local:string, // addr for local debug
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

