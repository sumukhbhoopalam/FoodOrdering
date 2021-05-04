import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './service/login.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminauthGuard implements CanActivate {

  user1:any='';
  subscription:Subscription;

  constructor(private ser:LoginService){
    this.subscription = this.ser.currentMessage.subscribe(e =>{console.log("cons adminguard"); this.user1=e; console.log("user",this.user1);})
   
  }

  canActivate(){
    console.log("auth guard");
    console.log("sub",this.subscription);
    if( this.user1.userid=="admin")
      return true;
    return false;
    
  }
  
}
