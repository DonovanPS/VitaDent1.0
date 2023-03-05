
import mysql from 'mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);


pool.getConnection((err, connection) => {
     if (err) throw err; connection.release(); 
     console.log('DB is connected'); 
     
     
});

export default pool;

/*
import mySql from './mySql';

const pool = mysql.createPool({
     host: 'localhost',
     user: 'root',
     password: 'rootpass',
     database: 'vitadent'
});


pool.getConnection((err, connection) => {
     if (err) throw console.log("qwwwwwwwwwwwwwwwwwwwwwwwwwwww");
     connection.release(); 
     console.log('DB is connected'); 
       
});




export default pool;
*/