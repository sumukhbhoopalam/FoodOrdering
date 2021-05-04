import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginpassService } from './loginpass.service';
import { LoginService } from './service/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginauthGuard implements CanActivate {
  user:any= [];
  constructor(private ser:LoginService,private logs:LoginpassService){
    this.ser.currentMessage.subscribe(e=>console.log("USer",e))
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("User",this.logs.userid.value)
      if(this.logs.userid.value!='userid'&&this.logs.userid.value!="AJ000068")
      return true;
      return false;
  }
  
}
