import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private URL = environment.apiUrl;

  constructor(private httpClient: HttpClient,
    private jwtHelper: JwtHelperService) {}

    findRecords(){
      return this.httpClient.get(`${this.URL}/record/findRecords`)
    }

    findRecordsID(id: number, consulta: string){
      return this.httpClient.get(`${this.URL}/record/${id}/${consulta}`)
    }

  


}
