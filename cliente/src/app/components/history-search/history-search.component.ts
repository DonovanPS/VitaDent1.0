import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from 'src/app/services/history.service';
import { UsuarioService } from 'src/app/services/paciente.service';
import { SonHistorySearchComponent } from 'src/app/components/son-history-search/son-history-search.component'

@Component({
  selector: 'app-history-search',
  templateUrl: './history-search.component.html',
  styleUrls: ['./history-search.component.css']
})
export class HistorySearchComponent {
  viewContainerRef: any;
  componentFactoryResolver: any;

  constructor(
    private historyService: HistoryService,
    private usuarioService: UsuarioService
    
    ) {
  }

  @ViewChild('buscar') buscar: ElementRef;
  id: '';

  dataPacienteOdontologia: { nombrePaciente: string, historial: string } ;

  dataPacienteOrtodoncia: { nombrePaciente: string, historial: string } ;

  showSonHistorySearchOdontologia = false;
  showSonHistorySearchOrtodoncia = false;


  public validDoc: boolean = true;

  validarNumeroDocumento(id: any) {

    if(id!==''){
      
      this.usuarioService.validar(id).subscribe((res: any) => {
        
  
       
  
        const { numUser } = res;
  
        this.validDoc = numUser == 0
       
  
  
        if (this.validDoc || id === '') this.buscar.nativeElement.disabled = true;
        if (!this.validDoc) this.buscar.nativeElement.disabled = false;
  
      })
      
    }

  
  }


  consultarHistorias() {

    //this.agregarComponente();

    this.showSonHistorySearchOdontologia = false;
    this.showSonHistorySearchOrtodoncia = false;

    this.historyService.findHistory(this.id).subscribe((res: any) => {

    


      if (res.numOdontologia == 1) {


        this.dataPacienteOdontologia = { 
          nombrePaciente: res.nombrePaciente, 
          historial: "1. Historial Odontológico"
        };

      
        this.toggleSonHistorySearchOdontologia();
      }


      if (res.numOrtodoncia == 1) {

        this.dataPacienteOrtodoncia = { 
          nombrePaciente: res.nombrePaciente, 
          historial: "2. Historial Ortodoncia"
        };


       
        this.toggleSonHistorySearchOrtodoncia();
      }



    })
  }

  toggleSonHistorySearchOdontologia() {
    this.showSonHistorySearchOdontologia = true
  }

  toggleSonHistorySearchOrtodoncia() {
    this.showSonHistorySearchOrtodoncia = true;
  }



  contador = 0;
  agregarComponente() {
    this.contador++;

    // Se crea una instancia del componente NuevoComponente y se agrega al contenedor
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SonHistorySearchComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    this.viewContainerRef.insert(componentRef.hostView);
  }


}
