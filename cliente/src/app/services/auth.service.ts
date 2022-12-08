import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000'
// private URL = 'https://vitadent10-production.up.railway.app/ '

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  singin(user:any){
    return this.http.post(`${this.URL}`,user)
  }

  isAuth():boolean{
    const token = localStorage.getItem('token');
    
    if(this.jwtHelper.isTokenExpired(token!) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
}
