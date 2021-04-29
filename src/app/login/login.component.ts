import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5'
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data:any = undefined;
  constructor(private ser:LoginService,private router:Router) {
   }

  ngOnInit(): void {
  }
  onSubmit(data:any)
  {
    const md5 = new Md5();
    this.ser.getUser(data.email).subscribe(e=>this.data=e,e=>alert("Invalid UserName"));
    if(this.data!= undefined )
    { 
      if(this.data.pass===md5.appendStr(data.password).end())
      {
        alert("Success")
        this.ser.changeMessage(this.data);
        if(this.data.userid =="admin")
        { this.router.navigate(['/adminhome']);}
        else
        { this.router.navigate(['/home']);}
      }
      else{
        alert("Invalid Password")
      }
    }
  }
}
