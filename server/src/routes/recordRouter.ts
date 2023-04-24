import {Router} from 'express';
import recordController from '../controllers/recordController';

class recordRouter{

    public router: Router = Router();

    private recordControler = new recordController();

    constructor(){
        this.config();
    };

    config(): void{
        this.router.get('/findRecords', this.recordControler.findRecords);
        this.router.get('/:id/:consulta', this.recordControler.findRecordsID);
    }

  

}

export default recordRouter;