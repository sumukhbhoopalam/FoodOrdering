import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../service/login.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  user:any='';
  initialValues:any;
  subscription:Subscription;
  updateForm:FormGroup;
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  urlRegEx = /^(https?:\/\/.*\.(?:png|jpg))$/;
  constructor(private ser:LoginService) { 
    this.subscription = this.ser.currentMessage.subscribe(e => this.user=e)
    this.updateForm = new FormGroup({
      name:new FormControl(this.user.name, [Validators.required]),
      email:new FormControl(this.user.email, [Validators.required, Validators.pattern(this.emailRegEx)]),
      address:new FormControl(this.user.address,),
      phone:new FormControl(this.user.phone, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      imageurl:new FormControl(this.user.imageurl,[Validators.pattern(this.urlRegEx)]),
  });
  this.initialValues=this.updateForm.value
  }

  onSubmit(data:any){
    var finalData = JSON.parse(`{
      "userid":"${this.user.userid}",
      "name":"${data.name}",
      "email":"${data.email}",
      "pass":"${this.user.pass}",
      "phone":"${data.phone}",
      "address":"${data.address}",
      "imageurl":"${data.imageurl}",
      "role":"${this.user.role}"
    }`
    );
    this.ser.updateUser(this.user.userid,finalData).subscribe(e=>{alert("Updated Details"),this.ser.changeMessage(finalData)},e=>{alert("Unable to update,try again"),console.log(e)})
  }

  onCancel()
  {
    this.updateForm.reset(this.initialValues);
  }

  ngOnInit(): void {
  }

}
