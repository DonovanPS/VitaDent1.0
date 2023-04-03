import { Request, Response } from 'express';
import HistoryService from '../services/historyServices';


class historyController {

    private historyService: HistoryService = new HistoryService();

    public newHistory = async (req: Request, res: Response) => {
    
        try {

            console.log(req.body);
            
            const { paciente, odontologia, anamnesis, examenPeriodontal, tejidosBlandos, tejidosDentales} = req.body

            await this.historyService.newHistory(paciente);
            await this.historyService.insertNewOdontologia(odontologia);
            await this.historyService.insertNewAnamnesis(anamnesis);
            await this.historyService.insertNewExamenPeriodontal(examenPeriodontal);
            await this.historyService.insertNewExamenTejidosBlnados(tejidosBlandos)
            await this.historyService.insertNewExamenTejidosDentales(tejidosDentales)

            res.status(200).json({
                success: true,
                message: "insercion correcta",
            });

        } catch (err) {
            console.log(err);

            // deberia ir 400
            res.status(200).json({
                success: false,
                message: err,
            });
        }
    }


    public findHistory = async (req: Request, res: Response) => {
        try {
            
            const {id}= req.params

            const [{nombrePaciente,numOdontologia, numOrtodoncia}] =  await this.historyService.findHistory(id);


            res.status(200).json({
             success: true,
             numOdontologia: numOdontologia,
             numOrtodoncia: numOrtodoncia,
             nombrePaciente: nombrePaciente,
         });


        } catch (err) {
            console.log(err);

            // deberia ir 400
            res.status(200).json({
                success: false,
                message: err,
            });
        }
    }


}

export default historyController;