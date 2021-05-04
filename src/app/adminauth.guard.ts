import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './service/login.service';
import { Subscription } from 'rxjs';
import { LoginpassService } from './loginpass.service';

@Injectable({
  providedIn: 'root'
})
export class AdminauthGuard implements CanActivate {
  user1:any=[];

  constructor(private ser:LoginService, private logs:LoginpassService){
   this.ser.currentMessage.subscribe(e =>{console.log("cons adminguard"); this.user1=e; console.log("user",this.user1);})
  }

  canActivate(){
    console.log("auth guard");
    console.log("loginpass ser:",this.logs.userid.value);
    if(this.logs.userid.value=="AJ000068")
      return true;
    return false;
    
  }
  
}
