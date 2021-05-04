import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {HomeComponent} from './home/home.component'
import { MyaccountComponent } from './myaccount/myaccount.component';
import { ItemsComponent } from './adminhome/items/items.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './adminhome/orders/orders.component';
import { AboutComponent } from './about/about.component';
import { MyordersComponent } from './myorders/myorders.component';
import { AdminauthGuard } from './adminauth.guard';
import { LoginauthGuard } from './loginauth.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'adminhome',component:AdminhomeComponent,canActivate:[AdminauthGuard],
    children:[
      {path:'',redirectTo:'items',pathMatch:'full'},
      {path:'items',component:ItemsComponent},
      {path:'orders',component:OrdersComponent}
    ]  
  },
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'myaccount',component:MyaccountComponent,canActivate:[LoginauthGuard]},
  {path:'cart',component:CartComponent,canActivate:[LoginauthGuard]},
  {path:'myorders',component:MyordersComponent,canActivate:[LoginauthGuard]},
  {path:'',redirectTo:'/home',pathMatch:'prefix'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
