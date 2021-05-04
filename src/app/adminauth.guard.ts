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
  user:any=[];

  constructor(private ser:LoginService){
    
  }

  canActivate(){
    this.ser.currentMessage.subscribe(e=>console.log("User",e))
    //console.log("auth guard");
    //console.log("sub",this.subscription);
    //if( this.user.email=="admin@gmail.com")
      //return true;
    return true;
    
  }
  
}
