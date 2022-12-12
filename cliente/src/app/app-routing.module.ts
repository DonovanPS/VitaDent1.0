import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorySearchComponent } from './components/history-search/history-search.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'history-search', component: HistorySearchComponent,canActivate:[AuthGuard]},
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
 


  {path: '**', pathMatch:'full', redirectTo:'login'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
