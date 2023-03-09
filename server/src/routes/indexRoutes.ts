import {Router} from 'express';
import indexController from '../controllers/indexController'

class IndexRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test',indexController.verifyToken,indexController.llamar);

        this.router.post('/', indexController.login);
        this.router.post('/create', indexController.create_User);
        
        //this.router.post('/',indexController.create_User);
        //this.router.delete('/:id',indexController.detele_User);
        //this.router.put('/:id',indexController.detele_User);
    }
}


const indexRoutes = new IndexRoutes();
export default indexRoutes.router;