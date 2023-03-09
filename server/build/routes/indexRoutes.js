"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = __importDefault(require("../controllers/indexController"));
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/test', indexController_1.default.verifyToken, indexController_1.default.llamar);
        this.router.post('/', indexController_1.default.login);
        this.router.post('/create', indexController_1.default.create_User);
        //this.router.post('/',indexController.create_User);
        //this.router.delete('/:id',indexController.detele_User);
        //this.router.put('/:id',indexController.detele_User);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
