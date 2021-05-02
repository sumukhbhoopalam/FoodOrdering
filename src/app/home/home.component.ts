import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ItemService } from '../service/item.service';
import * as uuid from 'uuid';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ItemService,CartService]
})
export class HomeComponent implements OnInit {
  
  items:any = [];
  user:any=[];
  finalData:any =[];
  customOptions: OwlOptions = {
    items: 1,
    loop: true,
    stagePadding: 0,
    margin: 0,
    dots:false,
    autoplay: true,
    autoplayTimeout: 5000,
    navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
    animateOut: 'animate__animated animate__slideOutDown',
    animateIn: 'animate__animated animate__flipInX',
    navSpeed: 700,
  }
  customOptions1: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout: 5000,
    navSpeed: 700,
    navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  constructor(private ser:LoginService,private data:ItemService,private cart:CartService){
    this.ser.currentMessage.subscribe(e=>this.user=e);
    this.data.getItems().subscribe(e=>this.items=e);
  }
  
  cartData(data:any){
    const myId = uuid.v4();
    this.finalData = JSON.parse(
      `{
        "cartid":"${myId}",
        "userid": "${this.user.userid}",
        "orderid": null,
        "itemid": "${data.itemid}",
        "quantity": 1,
        "price": "${data.price}"
      }`
    );
    console.log(this.finalData);
    this.cart.postItem(this.finalData).subscribe(e=>console.log("Item added to cart"))
  }
  ngOnInit(): void {
  }

}
