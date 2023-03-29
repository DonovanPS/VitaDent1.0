import { Subject, Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ExamenPeriodontal } from 'src/app/models/examen-periodontal';

@Component({
  selector: 'app-son-new-history-examen-periodontal',
  templateUrl: './son-new-history-examen-periodontal.component.html',
  styleUrls: ['./son-new-history-examen-periodontal.component.css']
})
export class SonNewHistoryExamenPeriodontalComponent implements OnInit, OnDestroy {
  examenperiodontal = new ExamenPeriodontal()
  message: string = "Hola Mundo!"

  @Input() eventSubject: Subject<boolean>;

  subscription: Subscription;


  ngOnInit(): void {
    if(this.eventSubject){
      this.subscription = this.eventSubject.asObservable().subscribe(
        res => this.prueba()
      )
    }
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  prueba(){
    console.log(this.examenperiodontal);
  }

}

