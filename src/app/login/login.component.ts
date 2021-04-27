import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(data:any)
  {
    const md5 = new Md5();
    let hashed = md5.appendStr(data.password).end();
    console.log(data);
    console.log(hashed)
  }

}
