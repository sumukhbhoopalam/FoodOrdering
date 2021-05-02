import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ItemService } from '../service/item.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers:[CartService,ItemService]
})
export class CartComponent implements OnInit {
  user:any =[];
  cartItems:any = [];
  itemData:any = [];
  total:any = 0;
  constructor(private ser:LoginService,private cart:CartService,private itemser:ItemService) {     
  }
  remove(e:any){
    this.cart.deleteItem(e).subscribe(d=>{alert("Item Removed"),this.ngOnInit()});
  }
  decrement(e:any)
  {
    var finalData=[];
    finalData = JSON.parse(
      `{
        "cartid":"${e.cartid}",
        "userid": "${e.userid}",
        "orderid": null,
        "itemid": "${e.itemid}",
        "quantity": "${e.quantity-1}",
        "price": "${e.price * (e.quantity-1)}"
      }`
    );
    if(e.quantity>1){
      this.cart.putItem(e.cartid,finalData).subscribe(e=>{alert("Successfuly Updated"),this.ngOnInit()});
    }
    else{
      alert("1 is the minimum");
    }
  }
  increment(e:any)
  {
    var finalData=[];
    finalData = JSON.parse(
      `{
        "cartid":"${e.cartid}",
        "userid": "${e.userid}",
        "orderid": null,
        "itemid": "${e.itemid}",
        "quantity": "${e.quantity+1}",
        "price": "${e.price * (e.quantity+1)}"
      }`
    );
    this.cart.putItem(e.cartid,finalData).subscribe(e=>{alert("Successfuly Updated"),this.ngOnInit()});
  }
  ngOnInit(): void {
    this.total=0;
    this.ser.currentMessage.subscribe((e:any)=>{
      this.user=e,
      this.cart.getItem(e.userid).subscribe(item=>{
        this.cartItems=item,
        this.cartItems.map((i:any)=>{
          this.total+=i.price,
          this.itemser.getItem(i.itemid).subscribe(k=>{this.itemData.push(k),console.log(this.itemData)});
        })
      })
    });
  }

}
