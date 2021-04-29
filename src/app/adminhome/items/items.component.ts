import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService} from '../../service/item.service'
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  item:any='';
  items:any;
  rbutton:any;
  rveg:number=1;
  itemForm:FormGroup;
  
 ngOnInit(): void {
}

  constructor(private ser:ItemService) { 
    this.ser.getItems().subscribe(e=>{this.items=e;console.log(this.items)});
    this.ser.getItem(2001).subscribe(e=>{this.item=e;console.log(this.item)});
    

    this.itemForm = new FormGroup({
      itemid:new FormControl(this.item.itemid, [Validators.required]),
      itemname:new FormControl(this.item.itemname, [Validators.required]),
      category:new FormControl(this.item.category, [Validators.required]),
      veg:new FormControl(this.item.veg, [Validators.required]),
      quantity:new FormControl(this.item.quantity,),
      price:new FormControl(this.item.price, [Validators.required]),
      description:new FormControl(this.item.description,[]),
  });

  }

  onSubmit(data:any)
  {
     console.log(data);
  }

  getit()
  {
    
    alert(this.rbutton);
  }

  handleChange()
  {
    alert("inside handle change : "+this.rbutton)
  }

}
