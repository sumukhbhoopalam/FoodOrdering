import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {HomeComponent} from './home/home.component'
import { MyaccountComponent } from './myaccount/myaccount.component';
import { ItemsComponent } from './adminhome/items/items.component';
import { UsersComponent } from './adminhome/users/users.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'adminhome',component:AdminhomeComponent,
    children:[
      {path:'',redirectTo:'items',pathMatch:'full'},
      {path:'items',component:ItemsComponent},
      {path:'users',component:UsersComponent}
    ]  
  },
  {path:'home',component:HomeComponent},
  {path:'myaccount',component:MyaccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
