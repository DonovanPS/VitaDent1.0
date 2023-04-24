import { Request, Response } from 'express';
import HistoryService from '../services/historyServices';


class historyController {

    private historyService: HistoryService = new HistoryService();

    // crea una nueva historia clinica
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


    // Muestra solo el numero de historia clinica
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


    // Muestra toda la historia clinica de un paciente por id
    public getHistory = async (req: Request, res: Response) => {


        
        try {

            const {id}= req.params
            const {tabla}= req.params
            const {nombreCampo}= req.params

            
            const data =  await this.historyService.getHistory(id,tabla,nombreCampo);

            res.status(200).json({
                success: true,
                data: data,
            });


            
        } catch (err) {
            console.log(err);

            // deberia ir 400
            res.status(400).json({
                success: false,
                message: err,
            });
        }


    }


}

export default historyController;