import express, { Request, Response } from 'express';


import multer, { StorageEngine } from 'multer';
import path from 'path';

import fs from 'fs';
import ImageService from '../services/imageService';


class ImageController {

  private ImageService = new ImageService();

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


  public uploadImage = async (req: Request, res: Response) => {


    try {

      const { id, history } = req.params

      // console.log(req as any);

      const { title, description } = req.body;


      const file: Express.Multer.File = (req as any).file;


      await this.ImageService.uploadImage(file, id, title, description, history);


      res.status(200).json({
        success: true,
        message: "imagen subida correctamente",
      });

    } catch (err) {
      console.log(err);

      // deberia ir 400
      res.status(200).json({
        success: false,
        message: err,
      });
    }
  }

  public getImagesID = async (req: Request, res: Response) => {

    try {

      const { id, history } = req.params

      const response = await this.ImageService.getImagesID(id, history);

      console.log(response);


      res.status(200).json({
        success: true,
        data: response,
      });

    } catch (err) {
      console.log(err);

      // deberia ir 400
      res.status(200).json({
        success: false,
        message: err,
      });
    }
  }

  public deleteImage = async (req: Request, res: Response) => {

    try {

      const { id , ruta} = req.params


      await this.ImageService.deleteImage(id, ruta);

      res.status(200).json({
        success: true,
        message: "Radiografia eliminada",
      });



    } catch (err) {
      console.log(err);

      // deberia ir 400
      res.status(200).json({
        success: false,
        message: err,
      });
    }
  }


  public updateImage = async (req: Request, res: Response) => {
    
    try {
     

      const { id, ruta} = req.params

      const { title, description } = req.body;

      const file: Express.Multer.File = (req as any).file;

      await this.ImageService.updateImage(file, id, title, description, ruta);


      res.status(200).json({
        success: true,
        message: "imagen actualizada correctamente",
      });


      
    } catch (err) {
      console.log(err);

      // deberia ir 400
      res.status(200).json({
        success: false,
        message: err,
      });
    }
  }


}

export default ImageController;

