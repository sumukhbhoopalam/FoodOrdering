import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5'
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  data:any =[];
  constructor(private ser:LoginService) { }

  ngOnInit(): void {
  }
  onSubmit(data:any)
  {
    const md5 = new Md5();
    let hashed = md5.appendStr(data.password).end();
    this.ser.getUser(data.email).subscribe(e=>this.data=e,e=>alert("Invalid UserName"));
    if(this.data!=[] && this.data.pass===hashed)
    {
      alert("Success")
    }
    else{
      alert("Invalid Password")
    }
  }

}
