import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService} from '../../service/item.service'
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import {HttpClient,HttpErrorResponse} from '@angular/common/http'
import {ItemtableComponent} from './itemtable/itemtable.component'
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';



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
  error1:any;
  
  itemidRegEx = /^[0-9]{4}$/;
  itemnameRegEx = /^[\w\)\(\[\]\s]{0,30}$/;
  categoryRegEx =  /^[\s\w-]{0,20}$/;
  qunatityRegEx =  /^[1-9]{1}[0-9]{0,3}$/;
  priceRegEx =  /^[1-9]{1}[0-9]{0,5}$/;


  IROitemid:boolean=false;
  IROitemname:boolean=false;
  IROcategory:boolean=false;
  IROveg:boolean=false;
  IROquantity:boolean=false;
  IROprice:boolean=false;
  IROdescription:boolean=false;
  IROimage:boolean=false;
  
 ngOnInit(): void {
}

  constructor(private ser:ItemService) { 
    this.ser.getItems().subscribe(e=>{this.items=e; });
    
    

    this.itemForm = new FormGroup({
      itemid:new FormControl(2001, [Validators.pattern(this.itemidRegEx)] ),
      itemname:new FormControl("", [Validators.pattern(this.itemnameRegEx)]),
      category:new FormControl(this.item.category, [Validators.pattern(this.categoryRegEx)]),
      veg:new FormControl(this.item.veg, []),
      quantity:new FormControl(this.item.quantity,[Validators.pattern(this.qunatityRegEx)]),
      price:new FormControl(this.item.price, [Validators.pattern(this.priceRegEx)]),
      description:new FormControl(this.item.description,[]),
      image:new FormControl(this.item.image,[])
  });

  }

  patchValue(data:any){
    this.itemForm.patchValue(data);
}


  getviewdata(id:number)
  {
     
  }

  onSubmit(data:any)
  {
     console.log(data+" : "+this.rbutton);
     if(this.rbutton=='view')
    {
      try{
          
          this.ser.getItem(data.itemid).subscribe(e=>{this.item=e;console.log(this.item)},error=>{ this.error1=error; alert("Unable to get data")});
          this.itemForm.get('veg')?.enable();      
          var temp=this;
          setTimeout(function()
            {
              temp.patchValue(temp.item);
              console.log("Get Reqest is Successful");
            },
            500);
       }
       catch(Exception)
       {
          console.log(this.getServerErrorMessage(this.error1));
       }

    }
    else if(this.rbutton=='edit')
    { //console.log("inside edit");
      try{

        if(this.rbutton=='edit')
          this.ser.updateItem(this.item.itemid,data).subscribe(e=>{this.item=e;console.log(this.item)},error=>{ this.error1=error; alert("Unable to update data")});
      
          //this.itemForm.get('veg')?.enable();      
          var temp=this;
          setTimeout(function()
            {
              temp.patchValue(temp.item);
              alert("Updated Successfully");
              console.log("Updated Successfully");
              temp.ser.getItems().subscribe(e=>{temp.items=e;});
              console.log("Updated items list")
            },
            2000);

       }
       catch(Exception)
       {
          console.log(this.getServerErrorMessage(this.error1));
       }

    }
    else if(this.rbutton=='create')
    {
      try{

        if(this.rbutton=='create')
          this.ser.PostItem(data).subscribe(e=>{this.item=e;console.log(this.item)},error=>{ this.error1=error; alert("Unable to update data")});
      
          //this.itemForm.get('veg')?.enable();      
          var temp=this;
          setTimeout(function()
            {
              //temp.patchValue(temp.item);
              alert("Post Req is Successful");
              console.log("Post Reqest is Successful");
              temp.ser.getItems().subscribe(e=>{temp.items=e;});
              console.log("Updated items list")
              
            },
            2000);

       }
       catch(Exception)
       {
          console.log(this.getServerErrorMessage(this.error1));
       }

    }
    else if(this.rbutton=='delete')
    {
      try
      { 
          if(this.rbutton=='delete')
        { 
           this.ser.DeleteItem(data.itemid).subscribe(e=>{console.log(e)},error=>{ this.error1=error; alert("Unable to update data")});
          //this.itemForm.get('veg')?.enable();      
            this.itemForm.reset();
            var temp=this;
          setTimeout(function()
            {
              //temp.patchValue(temp.item);
              alert("Delete Req is Successful");
              console.log("Delete Reqest is Successful");
              temp.ser.getItems().subscribe(e=>{temp.items=e;});
              console.log("Updated items list")
            },
            1000);
            

         }

     } 
     catch(Exception)
    {
         console.log(this.getServerErrorMessage(this.error1));
    }

    }

  }


  private getServerErrorMessage(error: HttpErrorResponse): string {
    console.log("inside geterrormsg fn: ",error.status);
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}
//////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////


  getit()
  {
    var id=this.itemForm.get('itemid')?.value;
    var temp=this;
    var tempitemform=this.itemForm;
    if(id==null)
    {console.log("ItemId is empty");}
    else
    {
    
      this.error1=null;      
      this.ser.getItem(id).subscribe(
        e=>
        {         this.item=e;
                  console.log(this.item);
                  //this.IROveg=true;
                  tempitemform.patchValue(temp.item);
        },
         error=>{ 
          this.error1=error; 
          console.log("Error :",this.error1); 
          tempitemform.reset(); 
          tempitemform.patchValue({'itemid':id});
        }
       );

    } // end of elsed
    

  }

  handleChange()
  {
    

    if(this.rbutton=='view' || this.rbutton=='delete')
    {
            console.log('selected: '+this.rbutton)                               
            this.IROitemid=false;
            this.IROitemname=true;
            this.IROcategory=true;
            this.IROveg=true;
            this.itemForm.get('veg')?.disable();
            this.IROquantity=true;
            this.IROprice=true;
            this.IROdescription=true;
            this.IROimage=true;
            console.log("All fields are made 'readonly' except 'itemid' ");          
    }
    else if(this.rbutton=='edit' || this.rbutton=='create' )
    {
      console.log('selected: '+this.rbutton)                               
      if(this.rbutton=='edit') 
        this.IROitemid=true;
      else
        this.IROitemid=false;

      this.IROitemname=false;
      this.IROcategory=false;
      this.IROveg=false;
      //this.itemForm.get('veg')?.disable();
      this.IROquantity=false;
      this.IROprice=false;
      this.IROdescription=false;
      this.IROimage=false;
      console.log("All fields are made editable except 'itemid' ");   
        
    }




  }

}
