import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private URL = environment.apiUrl;

  constructor(private httpClient: HttpClient,
    private jwtHelper: JwtHelperService) { }

  createHistory(newHistoryOdontologia:any){
    //console.log("history service");
    return this.httpClient.post(`${this.URL}/history/createNewHistory`,newHistoryOdontologia)
  }

  findHistory(id: any){
    return this.httpClient.get(`${this.URL}/history/findHistory/`+id)
  }

}
