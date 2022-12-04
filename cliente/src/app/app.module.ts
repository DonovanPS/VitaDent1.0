import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules

import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

// Providers
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    //JWT
    {provide: JWT_OPTIONS, useValue:JWT_OPTIONS},
    JwtHelperService,
    // Token Interceptor
    {provide: HTTP_INTERCEPTORS,useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
