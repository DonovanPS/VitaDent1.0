import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL = environment.apiUrl;
  
constructor(private httpClient: HttpClient,
  private jwtHelper: JwtHelperService) {}

  validar(id: number){
    return this.httpClient.get(`${this.URL}/paciente/countpaciente/`+id)
  }

}
