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
const bcrypt_1 = __importDefault(require("bcrypt"));
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
                conn.release();
            });
        }));
    }
    llamar(req, res) {
        console.log("llamar");
        console.log(dataToken);
        database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
            conn.query('SELECT * FROM Users', (err, result) => {
                res.json(result);
                conn.release();
            });
        }));
    }
    create_User(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, password } = req.body;
            const hashedPassword = yield bcrypt_1.default.hash(password, 12);
            database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                conn.query('INSERT INTO USERS VALUES (NULL, ?, ?)', [user, hashedPassword], (err, result) => {
                    console.log(result);
                    res.json("creacion hacida");
                });
            }));
        });
    }
    login(req, res) {
        console.log("entrado al login");
        // res.json('Validando  '+ req.params.user + ' ' + req.params.password)
        //const {user,password} = req.body;
        //console.log(req.body);
        const { user, password } = req.body;
        database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
            conn.query('SELECT * FROM Users where user = ?', [user, password], (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (result.length === 0)
                    return res.json('Usuario o contraseña incorrectas');
                const verified = yield bcrypt_1.default.compare(password, result[0].password);
                if (verified && result[0].user === user) {
                    let data = JSON.stringify(result[0]);
                    const token = jwt.sign(data, 'stil');
                    res.json({ token });
                }
                else {
                    res.json('Usuario o contraseña incorrectas');
                }
                conn.release();
            }));
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
