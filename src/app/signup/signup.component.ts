import { Component, OnInit } from '@angular/core';
import { SignupService } from '../service/signup.service';
import {Md5} from 'ts-md5';
import * as uuid from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[SignupService]
})
export class SignupComponent implements OnInit {
  localUrl:any[] = [];
  finalData : any = null;
  constructor(private router:Router,private ser:SignupService) { }

  ngOnInit(): void {
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

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.localUrl = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
}
}
