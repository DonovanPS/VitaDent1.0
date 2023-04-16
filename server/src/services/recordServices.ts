import pool from "../database";

class RecordService{
   

    public findRecords(){
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM registros', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

export default RecordService;