import { Component, OnInit } from '@angular/core';
import { SignupService } from '../service/signup.service';
import {Md5} from 'ts-md5';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[SignupService]
})
export class SignupComponent implements OnInit {
  localUrl:any[] = [];
  finalData : any = null;
  signupForm:FormGroup;
  password:string = '';
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  constructor(private router:Router,private ser:SignupService) {
    this.signupForm = new FormGroup({
      name:new FormControl(),
      email:new FormControl('', [Validators.pattern(this.emailRegEx)]),
      pass:new FormControl(),
      conpass:new FormControl(),
      address:new FormControl(),
      phone:new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      imageurl:new FormControl(),
  });
  }
  ngOnInit(): void {
  }

  MustMatch(c:any) {
    if(!c.value){
      return null;
    }
    if(c.value==="12345")
    {
        return null;
    }
    else{
        return {'addr':true};
    }
  }

  onSubmit(data:any){
    const myId = uuid.v4();
    const md5 = new Md5();
    let hashed = md5.appendStr(data.pass).end();
    this.finalData = JSON.parse(
      `{
        "name":"${data.name}",
        "email":"${data.email}",
        "pass":"${hashed}",
        "phone":"${data.phone}",
        "address":"${data.address}",
        "imageurl":"${data.imageurl}"}`
    );
    console.log(this.finalData);
    this.ser.postUser(this.finalData).subscribe(e=>{console.log(e),this.router.navigate(['/login'])},e=>alert("Unable to sign up,check the entered fields"))
  }
}
