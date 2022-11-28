"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const jwt = require('jsonwebtoken');
let dataToken;
class IndexController {
    list(req, res) {
        //const resultado =  pool.query('Desc Users');
        //console.log(resultado);
        //res.send( pool.query('Desc Users'));
        database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
            conn.query('Desc Users', (err, result) => {
                res.json(result);
            });
        }));
    }
    llamar(req, res) {
        console.log("llamar");
        console.log(dataToken);
        database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
            conn.query('SELECT * FROM Users', (err, result) => {
                res.json(result);
            });
        }));
    }
    create_User(req, res) {
    }
    login(req, res) {
        // res.json('Validando  '+ req.params.user + ' ' + req.params.password)
        //const {user,password} = req.body;
        //console.log(req.body);
        const { user, password } = req.body;
        database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
            conn.query('SELECT user FROM Users where user = ? and password = ?', [user, password], (err, result) => {
                if (result.length > 0) {
                    let data = JSON.stringify(result[0]);
                    const token = jwt.sign(data, 'stil');
                    res.json({ token });
                    // this.cookies.set("token",token)
                }
                else {
                    res.json('Usuario o contraseña incorrectas');
                }
            });
        }));
    }
    detele_User(req, res) {
        res.json('eliminando el usuario con id ' + req.params.id);
    }
    update_User(req, res) {
        res.json('actualizando el usuario con id' + req.params.id);
    }
    verifyToken(req, res, next) {
        try {
            if (!req.headers.authorization)
                return res.status(401).json('No autorizado');
            const token = req.headers.authorization.substr(7);
            if (token !== '') {
                const content = jwt.verify(token, 'stil');
                dataToken = content;
                next();
            }
            else {
                res.status(401).json('Token vacio');
            }
        }
        catch (e) {
            console.log(e);
            res.status(401).json('Error token');
        }
    }
}
const indexController = new IndexController();
exports.default = indexController;
