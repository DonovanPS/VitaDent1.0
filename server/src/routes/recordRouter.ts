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
    }

}

export default recordRouter;