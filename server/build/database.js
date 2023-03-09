"use strict";
/*import keys from './keys';

import keys from './mySql';

const pool = mysql.createPool(keys.database);


pool.getConnection((err, connection) => {
     if (err) throw err; connection.release();
     console.log('DB is connected');
     
     
});

export default pool;
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
;
/*
const pool = mysql.createPool({
     host: 'localhost',
     user: 'root',
     password: 'rootpass',
     database: 'vitadent'
});
*/
const mySql_1 = __importDefault(require("./mySql"));
const mysql_1 = __importDefault(require("mysql"));
const pool = mysql_1.default.createPool(mySql_1.default.database);
pool.getConnection((err, connection) => {
    if (err)
        throw err;
    connection.release();
    console.log('DB is connected');
});
exports.default = pool;
