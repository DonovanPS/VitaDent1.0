"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historyController_1 = __importDefault(require("../controllers/historyController"));
class historyRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.historyControler = new historyController_1.default();
        this.config();
    }
    config() {
        this.router.post('/createNewHistory', this.historyControler.newHistory);
        this.router.get('/findHistory/:id', this.historyControler.findHistory);
    }
}
exports.default = historyRouter;
