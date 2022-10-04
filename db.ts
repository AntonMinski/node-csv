import { DataSource } from "typeorm"


export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "admin",
    password: "1111",
    database: "node_csv",
    entities: [ "structure/entity/*.{js,ts}"],
    logging: true,
    synchronize: true,
})
