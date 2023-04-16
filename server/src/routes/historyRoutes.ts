import {Router} from 'express';
import historyController from '../controllers/historyController';

class historyRouter{


    public router: Router = Router();

    private historyControler = new historyController();
    

    constructor(){
        this.config();
    }

    config(): void{
       
        this.router.post('/createNewHistory', this.historyControler.newHistory);
        this.router.get('/findHistory/:id', this.historyControler.findHistory);
    }


}



export default historyRouter;