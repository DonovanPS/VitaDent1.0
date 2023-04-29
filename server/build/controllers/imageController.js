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
const imageService_1 = __importDefault(require("../services/imageService"));
class ImageController {
    constructor() {
        this.ImageService = new imageService_1.default();
        /*
        public uploadImage = async (req: Request, res: Response) => {
      
          console.log("entro");
          console.log(req.body);
          
          
      
          this.upload(req, res, (err: any) => {
            if (err) {
              res.status(400).json({
                success: false,
                message: err.message,
              });
            } else {
              const file = req.file;
              const description = req.body.description;
      
              // Aquí puedes llamar al servicio para agregar la información de la imagen a la base de datos
      
              res.status(200).json({
                success: true,
                message: 'Imagen subida correctamente',
                imageUrl: `http://localhost:3000/uploads/${file.filename}`,
              });
            }
          });
        };*/
        this.uploadImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, history } = req.params;
                // console.log(req as any);
                const { title, description } = req.body;
                const file = req.file;
                yield this.ImageService.uploadImage(file, id, title, description, history);
                res.status(200).json({
                    success: true,
                    message: "imagen subida correctamente",
                });
            }
            catch (err) {
                console.log(err);
                // deberia ir 400
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.getImagesID = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, history } = req.params;
                const response = yield this.ImageService.getImagesID(id, history);
                console.log(response);
                res.status(200).json({
                    success: true,
                    data: response,
                });
            }
            catch (err) {
                console.log(err);
                // deberia ir 400
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.deleteImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, ruta } = req.params;
                yield this.ImageService.deleteImage(id, ruta);
                res.status(200).json({
                    success: true,
                    message: "Radiografia eliminada",
                });
            }
            catch (err) {
                console.log(err);
                // deberia ir 400
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.updateImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, ruta } = req.params;
                const { title, description } = req.body;
                const file = req.file;
                yield this.ImageService.updateImage(file, id, title, description, ruta);
                res.status(200).json({
                    success: true,
                    message: "imagen actualizada correctamente",
                });
            }
            catch (err) {
                console.log(err);
                // deberia ir 400
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
    }
}
exports.default = ImageController;
