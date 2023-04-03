

import { SonNewHistoryFormAnamnesisComponent } from './../son-new-history-form-anamnesis/son-new-history-form-anamnesis.component';
import { Anamnesis } from './../../models/anamnesis';
import { SonNewHistoryExamenPeriodontalComponent } from './../son-new-history-examen-periodontal/son-new-history-examen-periodontal.component';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Paciente } from 'src/app/models/paciente';
import { Subject } from 'rxjs';
import { ExamenPeriodontal } from 'src/app/models/examen-periodontal';
import { Odontologia } from 'src/app/models/odontologia';
import { Tejidos_blandos } from 'src/app/models/tejidos_blandos';
import { Tejidos_dentales } from 'src/app/models/tejidos_dentales';
import { HistoryService } from 'src/app/services/history.service';
import { Route, Router } from '@angular/router';
import { NewHistoryOdontologia } from 'src/app/models/newHistoryOdontologia';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/paciente.service';


@Component({
  selector: 'app-new-history',
  templateUrl: './new-history.component.html',
  styleUrls: ['./new-history.component.css'],
  template: `
  Message:
  <app-SonNewHistoryExamenPeriodontalComponent></app-SonNewHistoryExamenPeriodontalComponent>

`,
})
export class NewHistoryComponent implements AfterViewInit {


  constructor(
    private historyService: HistoryService,
    //private router: Router,
    private usuarioService: UsuarioService
  ){
  }

  



  @ViewChild(SonNewHistoryExamenPeriodontalComponent) child: SonNewHistoryExamenPeriodontalComponent;
  eventSubject: Subject<boolean> = new Subject<boolean>();

  paciente= new Paciente()
  message:string;
  private examenPeriodontal: ExamenPeriodontal;
  private anamnesis: Anamnesis;
  private odontologia: Odontologia;
  private tejidosBlandos: Tejidos_blandos;
  private tejidosDentales: Tejidos_dentales;

  
  public validDoc: boolean = true;

  validarNumeroDocumento(id: any){

    this.usuarioService.validar(id).subscribe( (res:any) =>{

      console.log(res);
     
      const {numUser} = res;

      
      this.validDoc = numUser == 0
      
      //res.numUser

    })
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }


  ngAfterViewInit() {
    this.message = this.child.message
  }


  prueba(){
    this.paciente.fechaNacimiento= (this.paciente.fechaNacimiento)
      //console.log(this.paciente);
    this.eventSubject.next(true);
    //alert(this.message);

    console.log(this.paciente.fechaNacimiento);
    
    
    
 
    



    this.examenPeriodontal.examenPeriodontal_id=this.paciente.id;
    this.anamnesis.anmnesis_id=this.paciente.id;
    this.odontologia.odontologia_id=this.paciente.id;
    this.tejidosBlandos.tejidos_blandos_id=this.paciente.id;
    this.tejidosDentales.tejidos_dentales_id=this.paciente.id;

    this.examenPeriodontal.odontologia_id=this.paciente.id;
    this.anamnesis.odontologia_id=this.paciente.id;
    this.odontologia.paciente_id=this.paciente.id;
    this.tejidosBlandos.odontologia_id=this.paciente.id;
    this.tejidosDentales.odontologia_id=this.paciente.id;


    /*
    console.log(this.examenPeriodontal);
    console.log(this.anamnesis);
    console.log(this.odontologia);
    console.log(this.tejidosBlandos);
    console.log(this.tejidosDentales);
  
    this.newHistoryOdontologia = {}; 
    this.newHistoryOdontologia.paciente= this.paciente;
    this.newHistoryOdontologia.odontologia= this.odontologia;
    this.newHistoryOdontologia.anamnesis= this.anamnesis;
    this.newHistoryOdontologia.examenPeriodontal= this.examenPeriodontal;
    this.newHistoryOdontologia.tejidosBlandos= this.tejidosBlandos;
    this.newHistoryOdontologia.tejidosDentales= this.tejidosDentales;
      */

    const newHistoryOdontologia = new NewHistoryOdontologia();
    newHistoryOdontologia.paciente = this.paciente;
    newHistoryOdontologia.odontologia = this.odontologia;
    newHistoryOdontologia.anamnesis = this.anamnesis;
    newHistoryOdontologia.examenPeriodontal = this.examenPeriodontal;
    newHistoryOdontologia.tejidosBlandos = this.tejidosBlandos;
    newHistoryOdontologia.tejidosDentales = this.tejidosDentales;
    
    console.log(newHistoryOdontologia);


    this.historyService.createHistory(newHistoryOdontologia).subscribe( (res:any) =>{

      console.log(res);
        alert(res.message)
      

    })


  }

/*
  onSubmit(form: NgForm) {
    if (form.invalid) {
      const firstInvalidControl: HTMLElement | null = document.querySelector('.ng-invalid');
      
      if (firstInvalidControl !== null) {
        firstInvalidControl.scrollIntoView({ behavior: 'smooth' });
        firstInvalidControl.focus();
      }
    }
    

    // Resto de la lógica
  }
  */



  pruebaEvento(event: ExamenPeriodontal){
    this.examenPeriodontal = event;
  }

  anamnesisEvento(event: Anamnesis){
    this.anamnesis=event;
  }

  odontologiaEvento(event: Odontologia){
    this.odontologia=event;
  }
  tejidosBlandosEvento(event:Tejidos_blandos){
    this.tejidosBlandos=event;
  }

  tejidosDentalesEvento(event:Tejidos_dentales){
    this.tejidosDentales=event;
  }

}
