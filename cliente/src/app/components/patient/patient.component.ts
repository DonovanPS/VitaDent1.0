
import { Component } from '@angular/core';

import { Subject } from 'rxjs';
import ImageService from 'src/app/services/image.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { RecordService } from 'src/app/services/record.service';
import { environment } from 'src/environment/environment';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})




export class PatientComponent {


  tipoDocumento: number;
  history: string;
  records: any[] = [];
  showDivRadiografias: boolean = false;
  showDivTable: boolean = false;


  images: any[] = [];
  public URL = environment.apiUrl;


  showSonPatientOdontologia = false;
  showSonPatientOrtodoncia = false

  nombres: string;
  tipoDoc: string;
  numeroDocumento: string;

  idAux: number;


  imageForm: FormGroup;
  selectedFile: File;
  imageUrl: string;


  constructor(
    private recordService: RecordService,
    private pacienteService: PacienteService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,


  ) {

    this.imageForm = this.formBuilder.group({
      file: [''],
      description: [''],
      title: ['']
    });

  }

  eventSubject: Subject<boolean> = new Subject<boolean>();
  eventSubjectAgregarImagen: Subject<boolean> = new Subject<boolean>(); // bolena para agregar imagen



  ngOnInit(): void {

    const myButton2 = document.getElementById("myButton2") as HTMLButtonElement;
    myButton2.style.display = 'none';

    const verImagenes = document.getElementById("modalVerImagenes") as HTMLButtonElement;
    verImagenes.style.display = 'none';



    // estrae la variable del local Storage y la compara con el valor de la variable
    const history = localStorage.getItem('historial');

    this.history = history !== null ? history : '';

    if (history === '1. Historial Odontológico') {
      this.toggleSonPatientOdontologia()
      this.history = 'historial odontológico'

    } else if (history === '2. Historial Ortodoncia') {
      this.toggleSonPatientOrtodoncia()
      this.history = 'historial ortodoncia'
    }

    this.cargarRadiografias();

  }

  recibirInformacionPaciente(informacion: { nombres: string, tipoDocumento: string, numeroDocumento: string }) {

    this.nombres = informacion.nombres;
    this.tipoDoc = informacion.tipoDocumento;
    this.numeroDocumento = informacion.numeroDocumento;
    this.idAux = parseInt(this.numeroDocumento);

  }



  idPacienteEvento(event: string) {
    this.tipoDocumento = parseInt(event);

    if (this.history === 'historial odontológico') {
      this.consultaOdontologia();
      this.toggleSonPatientOdontologia();
    } else if (this.history === 'historial ortodoncia') {
      this.toggleSonPatientOrtodoncia()
      this.consultaOrtodoncia();
    }


  }

  toggleSonPatientOdontologia() {
    this.showSonPatientOdontologia = true

  }

  toggleSonPatientOrtodoncia() {
    this.showSonPatientOrtodoncia = true
  }

  consultaOdontologia() {

    this.recordService.findRecordsID(this.tipoDocumento, 'Odontologia').subscribe((res: any) => {


      this.records = res.records;

      this.recordService.findRecordsID(this.tipoDocumento, 'Urgencia').subscribe((res: any) => {


        this.records = [...this.records, ...res.records];

      });


    });

  }


  consultaOrtodoncia() {

    this.recordService.findRecordsID(this.tipoDocumento, 'Ortodoncia').subscribe((res: any) => {

      this.records = res.records;

      this.recordService.findRecordsID(this.tipoDocumento, 'Urgencia').subscribe((res: any) => {



        this.records = [...this.records, ...res.records];

      });


    });

  }


  showDiv(div: string) {




    if (div === 'R') {
      this.showDivRadiografias = true;
      this.showDivTable = false;
    } else {
      this.showDivRadiografias = false;
      this.showDivTable = true;
    }


  }

  editar() {
    this.eventSubject.next(true);
  }



  eliminar() {


    this.pacienteService.deletePaciente(this.idAux).subscribe((res: any) => {



      if (res.message === 'Paciente eliminado') {


        this.cambiarPagina();
      }
    });

  }

  cambiarPagina() {
    localStorage.setItem('eliminar', 'true');
    const myButton2 = document.getElementById("myButton2") as HTMLButtonElement;
    myButton2.click();
  }

  historia_Consultar: string;
  id: string;


  // radiografias

  cargarRadiografias() {

    if (this.history === 'historial odontológico') {
      this.historia_Consultar = 'Odontológico'
    } else {
      this.historia_Consultar = 'Ortodoncia'
    }

    const id = localStorage.getItem('paciente');

    this.id = id !== null ? id : '';

    this.imageService.getImagesID(this.id, this.historia_Consultar).subscribe((res: any) => {

      this.images = res.data;
    });


  }


  subirRadiografia() {
    this.eventSubjectAgregarImagen.next(true);

    this.ngOnInit();
  }

  deleteRadiografia(idImagen: string, ruta: string) {

    this.imageService.deleteImage(idImagen, ruta).subscribe((res: any) => {

      if (res.message === 'Radiografia eliminada') {


        this.toastr.success('Radiografia eliminada con exito', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: false,

        });


        this.ngOnInit();

      } else {

        this.toastr.error(res.message, 'Error al eliminar radiografia', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: false,
        });


      }
    });

  }

  updateRadiografia(idImagen: string) {

    if (this.selectedFile == null || this.verImagen.titulo == "" || this.verImagen.descripcion == "") {

      this.toastr.warning('Datos faltantes', 'Alerta', {
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: false,
      });

    } else {


      this.imageService.updateImage(idImagen, this.verImagen.titulo, this.verImagen.descripcion, this.verImagen.ruta ,this.selectedFile).subscribe((res: any) => {
        console.log(res);
        if (res.success) {

          this.toastr.success('Radiografia actualizada con exito', 'OK', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: false,

          });


          this.ngOnInit();

        } else {

          this.toastr.error(res.message, 'Error al actualizar radiografia', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: false,
          });


        }



      });

    }


  }

    verImagen: any = {
      descripcion: "Son muy lindas",
      historia: "Odontológico",
      paciente_id: 1002457248,
      radiografia_id: 4,
      ruta: "tv_show-the_owl_house-amity_blight-eda_clawthorne-king_clawthorne-luz_noceda-1043189.jpeg",
      titulo: "Lumity"
    };

    verImagenModal(image: any) {

      this.verImagen = image;

      const verImagenes = document.getElementById("modalVerImagenes") as HTMLButtonElement;
      verImagenes.click();
    }


    previewImage(event: any) {

      this.selectedFile = <File>event.target.files[0];

      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.imageUrl = e.target.result;
        };

        reader.readAsDataURL(event.target.files[0]);
      }
    }



  }
