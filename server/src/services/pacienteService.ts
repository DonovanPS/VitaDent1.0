import pool from '../database';

class PacienteService{

    public getPaciente(id: string){

        return new Promise<any>((resolve, reject) => {
   
            try {
                
                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'SELECT * from pacientes where paciente_id = ?',[
                            id
                        ],
                        async (err, result) => {

                            if (err) {
                                console.log("Error: " + err);
                                reject(err.sqlMessage)


                            } else {
                                resolve(result)
                                console.log("Result: ");
                                console.log(result);
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