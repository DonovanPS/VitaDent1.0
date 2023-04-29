import { PoolConnection } from 'mysql';
import pool from '../database';

class HistoryService {

    constructor() {


    }

    public newHistory(paciente: any): Promise<boolean> {


        return new Promise<boolean>((resolve, reject) => {

            try {

                //obtienen datos de odontologia

                console.log(paciente);

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'INSERT INTO pacientes (paciente_id, nombre, apellido, estado_civil, ciudad_nacimiento, fecha_nacimiento, tipo_documento, servicio_salud, ocupacion, ciudad_residencia, direccion, numero_celular, sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)', [
                        paciente.id,
                        paciente.nombre,
                        paciente.apellido,
                        paciente.estadoCivil,
                        paciente.ciudadNacimiento,
                        paciente.fechaNacimiento,
                        paciente.tipoID,
                        paciente.servicioSalud,
                        paciente.ocupacion,
                        paciente.ciudadResidencia,
                        paciente.direccion,
                        paciente.celular,
                        paciente.genero],

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



            } catch (error) {
                // Enviar una respuesta con error al cliente
                console.error(error);
                reject(error)
            }

        })


    }

    public inserAcudiente(dataAcudiente: any): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            try {

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'INSERT INTO acudientes ( nombre, apellido, fecha_nacimiento, parentesco, numero_celular, paciente_id) VALUES (?,?,?,?,?,?)', [

                        dataAcudiente.nombre,
                        dataAcudiente.apellido,
                        dataAcudiente.fechaNacimiento,
                        dataAcudiente.parentesco,
                        dataAcudiente.telefono,
                        dataAcudiente.id,
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
                // Enviar una respuesta con error al cliente
                console.error(err);
                reject(err)
            }
        });
    }


    public insertNewOdontologia(dataOdontologia: any): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            try {

                //insert datos de odontologia

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'INSERT INTO historiales_odontologia (odontologia_id, higiene_oral, cepillado, numero_cepillado, enjuague_bucal, seda_dental, plan_tratamiento, paciente_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
                        dataOdontologia.odontologia_id,
                        dataOdontologia.higiene_oral,
                        dataOdontologia.cepillado,
                        dataOdontologia.numero_cepillado,
                        dataOdontologia.enjuague_bucal,
                        dataOdontologia.seda_dental,
                        dataOdontologia.plan_tratamiento,
                        dataOdontologia.paciente_id
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
                // Enviar una respuesta con error al cliente
                console.error(err);
                reject(err)
            }

        });


    }


    public insertNewAnamnesis(dataAnamnesisi: any): Promise<boolean> {

        console.log(dataAnamnesisi);


        return new Promise<boolean>((resolve, reject) => {

            try {
                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'INSERT INTO anamnesis ( anamnesis_id, hipertension, enfermedades_respiratorias, cardiopatias, sistema_digestivo, fiebre_reumatica, hepatitis, enfermedades_renales, enfermedades_gastrointestinales, quirurgico, traumatico, tratamiento_medico, toma_medicamentos, alergias, embarazo, diabetes, neoplasias, enfermedad_hemorrogica, nf_neurologicas, grupo_sanguineo, rh, observaciones, odontologia_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                        dataAnamnesisi.anamnesis_id,
                        dataAnamnesisi.hipertencion,
                        dataAnamnesisi.enfe_respiratorias,
                        dataAnamnesisi.cardiopatias,
                        dataAnamnesisi.sistema_digestivo,
                        dataAnamnesisi.fiebre_reumatica,
                        dataAnamnesisi.hepatitis,
                        dataAnamnesisi.enfer_renales,
                        dataAnamnesisi.enfer_gastrointestinales,
                        dataAnamnesisi.quirurgico,
                        dataAnamnesisi.traumatico,
                        dataAnamnesisi.tratamiento_medico,
                        dataAnamnesisi.toma_medicamento,
                        dataAnamnesisi.alergia,
                        dataAnamnesisi.embarazo,
                        dataAnamnesisi.diabetes,
                        dataAnamnesisi.neoplasias,
                        dataAnamnesisi.enfer_hemorrogicas,
                        dataAnamnesisi.nf_neurologicas,
                        dataAnamnesisi.grupo_sangineo,
                        dataAnamnesisi.rh,
                        dataAnamnesisi.observaciones,
                        dataAnamnesisi.odontologia_id
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


    public insertNewExamenPeriodontal(dataPeriodontal: any): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            try {




                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'INSERT INTO examen_periodontal (periodontal_id	, bolsas, movilidad, placa_blanda, calculos, observaciones, odontologia_id ) VALUES (?, ?, ?, ?, ?, ?, ?)', [
                        dataPeriodontal.examenPeriodontal_id,
                        dataPeriodontal.bolsas,
                        dataPeriodontal.movilidad,
                        dataPeriodontal.placaBlanca,
                        dataPeriodontal.calculos,
                        dataPeriodontal.observaciones,
                        dataPeriodontal.odontologia_id
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

                    )
                })


            } catch (err) {
                console.error(err);
                reject(err)
            }
        });

    }


    public insertNewExamenTejidosBlnados(dataTejidosBlandos: any): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            console.log("tejidos dentales");

            console.log(dataTejidosBlandos);



            try {

                pool.getConnection(async (err, conn) => {

                    conn.query(
                        'INSERT INTO examenes_tejidos_blandos (tejidos_blandos_id, labios, carrillos, frenillos, encias, paladar, lengua, orofaringe, glandulas, piso_boca, musculos_masticatorios, otros, odontologia_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [

                        dataTejidosBlandos.tejidos_blandos_id,
                        dataTejidosBlandos.labios,
                        dataTejidosBlandos.carrillos,
                        dataTejidosBlandos.frenillos,
                        dataTejidosBlandos.encias,
                        dataTejidosBlandos.paladar,
                        dataTejidosBlandos.lengua,
                        dataTejidosBlandos.orofaringe,
                        dataTejidosBlandos.glandulas,
                        dataTejidosBlandos.piso_boca,
                        dataTejidosBlandos.musculos_masticatorios,
                        dataTejidosBlandos.otros,
                        dataTejidosBlandos.odontologia_id

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

                    )

                });


            } catch (err) {
                console.log(err)
                reject(err)
            }


        });
    }

    public insertNewExamenTejidosDentales(dataTejidosDentales: any): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {


            try {

                pool.getConnection(async (err, conn) => {

                    conn.query(
                        'INSERT INTO examenes_tejidos_dentales (tejidos_dentales_id, supernumerarios, abrasion, incluidos, maloclusiones, cambio_color, trauma, patologia_pulpar, otros, odontologia_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                        dataTejidosDentales.tejidos_dentales_id,
                        dataTejidosDentales.supernumerarios,
                        dataTejidosDentales.abrasion,
                        dataTejidosDentales.incluidos,
                        dataTejidosDentales.maloclusiones,
                        dataTejidosDentales.cambio_color,
                        dataTejidosDentales.trauma,
                        dataTejidosDentales.patologia_pulmonar,
                        dataTejidosDentales.otros,
                        dataTejidosDentales.odontologia_id
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
                // Enviar una respuesta con error al cliente
                console.error(err);
                reject(err);
            }

        });

    }


    // Muestra si existe los historiales

    public findHistory(id: string) {
        return new Promise<any>((resolve, reject) => {

            try {

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'SELECT (SELECT CONCAT(nombre, " ", apellido) FROM pacientes WHERE paciente_id = ?)AS nombrePaciente, (SELECT COUNT(*) FROM historiales_odontologia WHERE odontologia_id = ?) AS numOdontologia, (SELECT COUNT(*) FROM historiales_ortodoncia WHERE ortodoncia_id = ?) AS numOrtodoncia', [
                        id,
                        id,
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


    // obtiene datos del historial de odontologia
    public getHistory(id: string, tabla: string, nombreCampo: string) {

        return new Promise<any>((resolve, reject) => {

            try {

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        `SELECT * FROM ${tabla} WHERE ${nombreCampo} = ?`, [
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

    public deleteHistory(id: string, tabla: string) {
        return new Promise<any>((resolve, reject) => {


            try {

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        `DELETE FROM ${tabla} WHERE odontologia_id = ?`, [
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


    // Actualizar

    public updatePacienteWithTransaction(paciente: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE pacientes SET 
                    paciente_id = ${paciente.id},
                    tipo_documento = '${paciente.tipoID}',
                    nombre = '${paciente.nombre}',
                    apellido = '${paciente.apellido}',
                    fecha_nacimiento = '${paciente.fechaNacimiento}',
                    sexo = '${paciente.genero}',
                    estado_civil = '${paciente.estadoCivil}',
                    ciudad_nacimiento = '${paciente.ciudadNacimiento}',
                    ocupacion = '${paciente.ocupacion}',
                    servicio_salud = '${paciente.servicioSalud}',
                    ciudad_residencia = '${paciente.ciudadResidencia}',
                    direccion = '${paciente.direccion}',
                    numero_celular = '${paciente.celular}'
                    WHERE paciente_id = ${idAux}`,
                async (err, result) => {
                    if (err) {
                        console.log("Error: " + err);
                        reject('Pacientes Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        })
    }

    public updateAcudienteWithTransaction(acudienteData: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE acudientes SET
                
                nombre = '${acudienteData.nombre}',
                apellido = '${acudienteData.apellido}',
                fecha_nacimiento = '${acudienteData.fechaNacimiento}',
                parentesco = '${acudienteData.parentesco}',
                numero_celular = '${acudienteData.telefono}'
                 WHERE paciente_id = ${idAux}`,

                async (err, result) => {
                    if (err) {
                        console.log("Error: " + err);
                        reject('Acudiente Error:' + err.sqlMessage);
                    } else {

                        resolve(true);
                    }
                })
        })
    }

    public updateOdontologiaWithTransaction(odontologiaData: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE historiales_odontologia SET
                    odontologia_id = ${odontologiaData.odontologia_id},
                    higiene_oral = '${odontologiaData.higiene_oral}',
                    cepillado = '${odontologiaData.cepillado}',
                    numero_cepillado = '${odontologiaData.numero_cepillado}',
                    enjuague_bucal = '${odontologiaData.enjuague_bucal}',
                    seda_dental = '${odontologiaData.seda_dental}',
                    plan_tratamiento = '${odontologiaData.plan_tratamiento}',
                    paciente_id = ${odontologiaData.paciente_id}
                    WHERE odontologia_id = ${idAux}`, [

            ],

                async (err, result) => {
                    if (err) {
                        console.log("Error: " + err);
                        reject('Odontologia Error:' + err.sqlMessage);
                    } else {

                        resolve(true);
                    }
                })
        })
    }

    public updateAnamnesisWithTransaction(anamnesisData: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE anamnesis SET 
                    anamnesis_id = ?, 
                    hipertension = ?, 
                    enfermedades_respiratorias = ?, 
                    cardiopatias = ?, 
                    sistema_digestivo = ?, 
                    fiebre_reumatica = ?, 
                    hepatitis = ?, 
                    enfermedades_renales = ?, 
                    enfermedades_gastrointestinales = ?, 
                    quirurgico = ?, 
                    traumatico = ?, 
                    tratamiento_medico = ?, 
                    toma_medicamentos = ?, 
                    alergias = ?, 
                    embarazo = ?, 
                    diabetes = ?, 
                    neoplasias = ?, 
                    enfermedad_hemorrogica = ?, 
                    nf_neurologicas = ?, 
                    grupo_sanguineo = ?, 
                    rh = ?, 
                    observaciones = ?
                    WHERE anamnesis_id = ?
                    ` , [
                anamnesisData.anamnesis_id,
                anamnesisData.hipertencion,
                anamnesisData.enfe_respiratorias,
                anamnesisData.cardiopatias,
                anamnesisData.sistema_digestivo,
                anamnesisData.fiebre_reumatica,
                anamnesisData.hepatitis,
                anamnesisData.enfer_renales,
                anamnesisData.enfer_gastrointestinales,
                anamnesisData.quirurgico,
                anamnesisData.traumatico,
                anamnesisData.tratamiento_medico,
                anamnesisData.toma_medicamento,
                anamnesisData.alergia,
                anamnesisData.embarazo,
                anamnesisData.diabetes,
                anamnesisData.neoplasias,
                anamnesisData.enfer_hemorrogicas,
                anamnesisData.nf_neurologicas,
                anamnesisData.grupo_sangineo,
                anamnesisData.rh,
                anamnesisData.observaciones,
                idAux
            ],

                async (err, result) => {
                    if (err) {
                        console.log("Error: " + err);
                        reject('Anamnesis Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        })
    }

    public updateTejidosBlandosWithTransaction(tejidosBlandos: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE examenes_tejidos_blandos SET 
                tejidos_blandos_id = ?,
                labios = ?,
                carrillos = ?,
                frenillos = ?,
                encias = ?,
                paladar = ?,
                lengua = ?,
                orofaringe = ?,
                glandulas = ?,
                piso_boca = ?,
                musculos_masticatorios = ?,
                otros = ?
                WHERE tejidos_blandos_id = ?`,[
                    tejidosBlandos.tejidos_blandos_id,
                    tejidosBlandos.labios,
                    tejidosBlandos.carrillos,
                    tejidosBlandos.frenillos,
                    tejidosBlandos.encias,
                    tejidosBlandos.paladar,
                    tejidosBlandos.lengua,
                    tejidosBlandos.orofaringe,
                    tejidosBlandos.glandulas,
                    tejidosBlandos.piso_boca,
                    tejidosBlandos.musculos_masticatorios,
                    tejidosBlandos.otros,
                    idAux

                ],

                async (err, result) => {
                    if (err) {
                        console.log("Error: " + err);
                        reject('Tejidos Blandos Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        })
    }

    public updateTejidosDentalesWithTransaction(tejidosDentales: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE examenes_tejidos_dentales SET 
                tejidos_dentales_id = ?,
                supernumerarios = ?,
                abrasion = ?,
                incluidos = ?,
                maloclusiones = ?,
                cambio_color = ?,
                trauma = ?,
                patologia_pulpar = ?,
                otros = ?
                WHERE tejidos_dentales_id = ?`,[
                    tejidosDentales.tejidos_dentales_id,
                    tejidosDentales.supernumerarios,
                    tejidosDentales.abrasion,
                    tejidosDentales.incluidos,
                    tejidosDentales.maloclusiones,
                    tejidosDentales.cambio_color,
                    tejidosDentales.trauma,
                    tejidosDentales.patologia_pulmonar,
                    tejidosDentales.otros,
                    idAux

                ],

                async (err, result) => {
                    if (err) {
                        console.log("Error: " + err);
                        reject('Tejidos Dentales Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        })
    }


    public updatePeriodontalWithTransaction(examenPeriodontal: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE examen_periodontal SET
                                periodontal_id = ${examenPeriodontal.examenPeriodontal_id},
                                bolsas = '${examenPeriodontal.bolsas}',
                                movilidad = '${examenPeriodontal.movilidad}',
                                placa_blanda = '${examenPeriodontal.placaBlanca}',
                                calculos = '${examenPeriodontal.calculos}',
                                observaciones = '${examenPeriodontal.observaciones}'
                                
                                WHERE periodontal_id = ${idAux}`,

                async (err, result) => {
                    if (err) {
                        console.log("Error: " + err);
                        reject('Periodontal Error:' + err.sqlMessage);
                    } else {

                        resolve(true);
                    }
                })
        })
    }


    public updateAllDataPaciente(idAux: string, pacienteData: any) {

        const { paciente, acudiente, odontologia, anamnesis, examenPeriodontal, tejidosBlandos, tejidosDentales } = pacienteData



        return new Promise<any>((resolve, reject) => {
            pool.getConnection(async (err, conn) => {
                try {
                    conn.beginTransaction((err) => {
                        if (err) reject(err.sqlMessage);
                    });
                    await this.updatePacienteWithTransaction(paciente, idAux, conn);
                    await this.updateAcudienteWithTransaction(acudiente, idAux, conn);
                    await this.updateOdontologiaWithTransaction(odontologia, idAux, conn);
                    await this.updateAnamnesisWithTransaction(anamnesis, idAux, conn);
                    await this.updatePeriodontalWithTransaction(examenPeriodontal, idAux, conn);
                    await this.updateTejidosBlandosWithTransaction(tejidosBlandos, idAux, conn);
                    await this.updateTejidosDentalesWithTransaction(tejidosDentales, idAux, conn);
                    conn.commit((err) => {
                        if (err) {
                            console.log("Error: " + err);
                            conn.rollback(() => {
                                reject(err.sqlMessage);
                            });
                        } else {
                            resolve(true);
                        }
                    });
                } catch (error) {
                    conn.rollback(() => {
                        reject(error);
                    })
                }
            });
        })
    }






}

export default HistoryService;