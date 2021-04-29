import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService} from '../../service/item.service'
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items:any;

  
  
  //initialValues:any;
  
 // updateItemForm:FormGroup;


  constructor(private ser:ItemService) { 
    this.ser.getItems().subscribe(e=>{this.items=e;console.log(this.items)});
  }

  /*
    this.updateItemForm = new FormGroup({
      name:new FormControl(this.item.name),
      email:new FormControl(this.item.email),
      address:new FormControl(this.item.address),
      phone:new FormControl(this.item.phone),
      imageurl:new FormControl(this.item.imageurl),
  });
  this.initialValues=this.updateItemForm.value
  }


  onSubmit(data:any){
    var finalData = JSON.parse(`{
      "userid":"${this.item.userid}",
      "name":"${data.name}",
      "email":"${data.email}",
      "pass":"${this.item.pass}",
      "phone":"${data.phone}",
      "address":"${data.address}",
      "imageurl":"${data.imageurl}",
      "role":"${this.item.role}"
    }`
    );
    this.ser.updateItem(this.item.userid,finalData).subscribe(e=>{alert("Updated Details"),this.ser.changeMessage(finalData)},e=>{alert("Unable to update,try again"),console.log(e)})
  }

  onCancel()
  {
    this.updateItemForm.reset(this.initialValues);
  }

*/

  ngOnInit(): void {
  }

}
