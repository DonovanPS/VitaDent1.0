import keys from './mySql';
import mysql from 'mysql'

const pool = mysql.createPool(keys.database);


pool.getConnection((err, connection) => {
     if (err) throw err; connection.release(); 
     console.log('DB is connected');
     
});

export default pool;
