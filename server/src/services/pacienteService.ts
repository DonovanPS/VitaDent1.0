import pool from '../database';

class PacienteService{

    public getUser(id: string){

        return new Promise<boolean>((resolve, reject) => {

            try {
                
                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'SELECT paciente_id from pacientes where paciente_id = ?',[
                            id
                        ],
                        async (err, result) => {

                            if (err) {
                                console.log("Error: " + err);
                                reject(err.sqlMessage)


                            } else {
                                resolve(true)
                                console.log("Result: " + result);
                            }
                            conn.release();
                        }
                    );
                });



            } catch (err) {
                console.error(err);
                reject(err) 
            }
        });
    }

    
    public countuser(id: string){

        return new Promise<any>((resolve, reject) => {

            try {
                
                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'SELECT count(*) as numUsers from pacientes where paciente_id = ?',[
                            id
                        ],
                        async (err, result) => {

                            if (err) {
                                console.log("Error: " + err);
                                reject(err.sqlMessage)


                            } else {
                                resolve(result[0])
                                console.log("Result: " + result);
                            }
                            conn.release();
                        }
                    );
                });



            } catch (err) {
                console.error(err);
                reject(err) 
            }
        });
        
    }

}
export default PacienteService;