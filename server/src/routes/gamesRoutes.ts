import {Router} from 'express';

class GamesRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',(req,res) => res.send('Games'));
    }
}
const gameRoutes = new GamesRoutes();
export default gameRoutes.router;