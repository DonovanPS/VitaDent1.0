import { Request, Response } from 'express';
import RecordService from '../services/recordServices';

class recordController {
  
    private recorService: RecordService = new RecordService();

    public findRecords = async (req: Request, res: Response) => {
        try {
            const records = await this.recorService.findRecords();
            res.status(200).json({
                success: true,
                records: records,
                });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                success: false,
                message: err,
            });
        }
    }

}

export default recordController;