import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {EditComponent} from "./components/edit/edit.component";
import {NewComponent} from "./components/new/new.component";
import {CanReadGuard} from "./guards/can-read.guard";
import {CanEditGuard} from "./guards/can-edit.guard";
import {CanCreateGuard} from "./guards/can-create.guard";

const routes: Routes = [
  {
    path:"",
    component: HomeComponent,
    canActivate: [CanReadGuard]
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"edit/:email",
    component:EditComponent,
    canActivate: [CanEditGuard]
  },
  {
    path:"new",
    component:NewComponent,
    canActivate: [CanCreateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
