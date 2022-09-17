import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogintypeComponent } from './logintype/logintype.component';
import { MainnewsComponent } from './mainnews/mainnews.component';
import { SignuptypeComponent } from './signuptype/signuptype.component';

const routes: Routes = [
  {path:'',component:LogintypeComponent},
  {path:'signup',component:SignuptypeComponent},
  {path:'main',component:MainnewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
