import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";

dotenv.config({
    path: process.env.ENV === 'test' ? '.env.test' : '.env',
});

const datasource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    //entities: ['../src/**/entity/*.ts'],
    migrations:[`${__dirname}/migrations/**/*.ts`],
});

export default datasource;
