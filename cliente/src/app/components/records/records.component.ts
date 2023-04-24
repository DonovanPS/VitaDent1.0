import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RecordService } from 'src/app/services/record.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';



@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']

  

})
export class RecordsComponent  {
  @ViewChild('myTbody') myTbody: ElementRef;

  records: any[] = [];
  recordsAux: any[] = [];
  recordsAux2: any[] = [];
  filteredRecords: any[] = [];
  totalPrice: string

  isUrgent = false;
  isDental = false;
  isOrthodontic = false;

  constructor(private recordService: RecordService) {}

  ngOnInit() {
    this.recordService.findRecords().subscribe((res: any) => {
      this.records = res.records;
      this.recordsAux = res.records;
      this.recordsAux2 = res.records;
      this.calculateTotalPrice();


    });
  }


  sortTableDate(direction: string) {

    if (direction === 'asc') {
      this.records.sort((a, b) => (a.fecha > b.fecha ? 1 : -1));
    } else {
      this.records.sort((a, b) => (b.fecha > a.fecha ? 1 : -1));
    }
  }

  sortTablePrice(direction: string) {

    if (direction === 'asc') {
      this.records.sort((a, b) => (a.precio > b.precio ? 1 : -1));
    } else {
      this.records.sort((a, b) => (b.precio > a.precio ? 1 : -1));
    }
  }


  filterByDateRange() {


    const fromDate: string = (<HTMLInputElement>document.getElementById('fromDate')).value;
    const toDate: string = (<HTMLInputElement>document.getElementById('toDate')).value;





    if (fromDate && toDate) {


      this.filteredRecords = this.recordsAux.filter(record => {
        return (record.fecha >= fromDate && record.fecha <= toDate);
      });

     this.records= this.filteredRecords;
     this.recordsAux2 = this.records;

    } else {


      this.records = this.recordsAux;
      this.recordsAux2 = this.records;
    }
    this.calculateTotalPrice()
  }

  filterbytype() {

    let filteredRecords2: any[] = [];
    if (this.isUrgent) {
      filteredRecords2 = filteredRecords2.concat(this.recordsAux2.filter(item => item.consulta === 'Urgencia'));
    }
    if (this.isDental) {
      filteredRecords2 = filteredRecords2.concat(this.recordsAux2.filter(item => item.consulta === 'Odontología'));
    }
    if (this.isOrthodontic) {
      filteredRecords2 = filteredRecords2.concat(this.recordsAux2.filter(item => item.consulta === 'Ortodoncia'));
    }

    if(!this.isUrgent && !this.isDental && !this.isOrthodontic){
      this.records = this.recordsAux2;
    }else{
      this.records = filteredRecords2;
    }
    this.calculateTotalPrice()

  }

  calculateTotalPrice() {
    let total = 0;
    this.records.forEach(record => {
      total += record.precio;
    });


   let formattedTotal = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
   this.totalPrice = formattedTotal;
  }



}
