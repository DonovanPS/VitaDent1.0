import {Router} from 'express';
import PacienteController from '../controllers/pacienteController';

class PacienteRoutes{

    
    public router: Router = Router();

    private usuarioControler = new PacienteController();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/:id', this.usuarioControler.getusuario)
        this.router.get('/countpaciente/:id', this.usuarioControler.countusuario)

    }

}

export default PacienteRoutes;