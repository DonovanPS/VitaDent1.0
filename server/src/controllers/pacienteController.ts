import PacienteService from "../services/pacienteService";
import { Request, Response } from 'express';

class PacienteController{

    private usuarioService: PacienteService = new PacienteService();

    public getusuario =  async (req: Request, res: Response) => {

        try {
            
            const {id}= req.params

            const data = await this.usuarioService.getPaciente(id);

            res.status(200).json({
                success: true,
                data: data,
            });


        } catch (err) {
            console.log(err);

            res.status(400).json({
                success: false,
                message: err,
            });
        }
    }


    public countusuario =  async (req: Request, res: Response) => {

        try {
            
            const {id}= req.params

           
           const {numUsers} =  await this.usuarioService.countuser(id);


           res.status(200).json({
            success: true,
            numUser: numUsers,
        });


        } catch (err) {
            console.log(err);

            res.status(400).json({
                success: false,
                numUser: 0,
            });
        }
    }


   

}

export default PacienteController;