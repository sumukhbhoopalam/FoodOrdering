import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ItemService } from '../service/item.service';
import { LoginService } from '../service/login.service';
import { OrderService } from '../service/order.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers:[CartService,ItemService,OrderService]
})
export class CartComponent implements OnInit {
  user:any =[];
  cartItems:any = [];
  itemData:any = [];
  total:any = 0;
  constructor(private ser:LoginService,private cart:CartService,private itemser:ItemService,private orderser:OrderService) {     
  }
  remove(e:any){
    this.cart.deleteItem(e).subscribe(d=>{alert("Item Removed"),this.ngOnInit()});
  }
  decrement(e:any,index:any)
  {
    var finalData=[];
    finalData = JSON.parse(
      `{
        "cartid":"${e.cartid}",
        "userid": "${e.userid}",
        "orderid": null,
        "itemid": "${e.itemid}",
        "quantity": "${e.quantity-1}",
        "price": "${this.itemData[index].price * (e.quantity-1)}"
      }`
    );
    if(e.quantity>1){
      this.cart.putItem(e.cartid,finalData).subscribe(e=>{this.ngOnInit()},e=>alert("Could not Update"));
    }
    else{
      alert("1 is the minimum");
    }
  }
  increment(e:any,index:any)
  {
    var finalData=[];
    finalData = JSON.parse(
      `{
        "cartid":"${e.cartid}",
        "userid": "${e.userid}",
        "orderid": null,
        "itemid": "${e.itemid}",
        "quantity": "${e.quantity+1}",
        "price": "${this.itemData[index].price * (e.quantity+1)}"
      }`
    );
    this.cart.putItem(e.cartid,finalData).subscribe(e=>{this.ngOnInit()},e=>alert("Could not Update"));
  }
  order(){
    var finalData=[];
    var finData=[];
    const myId = uuid.v4();
    finalData = JSON.parse(
      `{
        "orderid":"${myId}",
        "totprice":"${this.total}",
        "orderstatus":"processing",
        "orddatetime":"${new Date(Date.now()).toISOString()}",
        "userid":"${this.user.userid}"
      }`
    );
    console.log("Order",finalData)
    this.orderser.postOrder(finalData).subscribe((e:any)=>{
      this.cartItems.map((i:any)=>{
        finData = JSON.parse(
          `{
            "cartid":"${i.cartid}",
            "userid": "${i.userid}",
            "orderid": "${e.orderid}",
            "itemid": "${i.itemid}",
            "quantity": "${i.quantity}",
            "price": "${i.price}"
          }`
        );
        this.cart.putItem(i.cartid,finData).subscribe(l=>{this.ngOnInit()},l=>{alert("Order Unsuccessful")})
      })
    },e=>{alert("Order Unsuccessful")},()=>{alert("Order Sucessful")})
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
