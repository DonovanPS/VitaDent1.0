import {Request, Response} from 'express';

import pool from '../database';

import bcrypt from "bcrypt";

const jwt = require('jsonwebtoken');

let dataToken: string;

class IndexController {
    
  
    public list (req: Request,res:Response) {
       
        //const resultado =  pool.query('Desc Users');
       
        //console.log(resultado);
        //res.send( pool.query('Desc Users'));

        pool.getConnection(async (err,conn)=>{
            conn.query('Desc Users',(err,result)=>{
                res.json(result)
                conn.release();
            });
        })
    } 


    public  llamar (req: Request,res:Response){
        console.log("llamar");
        console.log(dataToken);
    
        pool.getConnection(async (err,conn)=>{
            conn.query('SELECT * FROM Users',(err,result)=>{
                res.json(result)
                conn.release();
            });
        })
       
    }

    public async create_User (req: Request,res:Response){
        const{user,password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        pool.getConnection(async (err,conn)=>{
            conn.query('INSERT INTO USERS VALUES (NULL, ?, ?)',[user, hashedPassword],(err,result)=>{
                console.log(result);
                res.json("creacion hacida")
            });
        })

    }

    public login  (req: Request,res:Response){
        console.log("entrado al login");
        
       // res.json('Validando  '+ req.params.user + ' ' + req.params.password)
        //const {user,password} = req.body;

        //console.log(req.body);

        const{user,password} = req.body;
        
        pool.getConnection(async (err,conn)=>{
            conn.query('SELECT * FROM Users where user = ?',[user,password],async (err,result)=>{
                if(result.length === 0) return res.json('Usuario o contraseña incorrectas');      

                const verified = await bcrypt.compare(password, result[0].password );
                
                if (verified && result[0].user === user ){
                  let data = JSON.stringify(result[0]);
                  const token = jwt.sign(data,'stil');
                  res.json({token})
                }else{
                    res.json('Usuario o contraseña incorrectas');
                
                }
               
                conn.release();
            });
        })
       

    }

   

    public detele_User (req: Request,res:Response){
        res.json('eliminando el usuario con id '+ req.params.id)
    }
  
    public update_User (req: Request,res:Response){
        res.json('actualizando el usuario con id'+req.params.id)
    }




    public verifyToken(req: Request,res:Response,next:any) {
        
        try{
            if(!req.headers.authorization) return res.status(401).json('No autorizado');
            const token = req.headers.authorization.substr(7);
            
            if(token!==''){
                const content = jwt.verify(token,'stil');
                dataToken = content;
                
                next();
    
            }else{
                res.status(401).json('Token vacio');
            }

        } catch (e){
            console.log(e)
            res.status(401).json('Error token');
        } 
        
    }




}


const indexController = new IndexController();
export default indexController