import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { OrderService } from '../service/order.service';
import { LoginService } from '../service/login.service';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers:[OrderService,ItemService]
})
export class MyordersComponent implements OnInit {
  user:any;
  orders:any;
  orderItems:any = [];
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('orderid')===this.orders[i].orderid;
  columnsToDisplay = ['orderid', 'orddatetime', 'totprice'];
  expandedElement: any;
  constructor(private ser:LoginService,private data:OrderService,private itemser:ItemService) {
    this.ser.currentMessage.subscribe((e:any)=>{
      this.user=e,
      this.data.getOrder(e.userid).subscribe(item=>{
        this.orders=item,
        this.orders.map((i:any,index:any)=>{
          this.data.getOrderItems(e.userid).subscribe((k:any)=>{
            if(true)
              this.orders[index].items=k.filter(function (el:any) {
                return el.orderid===i.orderid
              }),
              this.orders[index].items.map((i1:any,index1:any)=>{
                this.itemser.getItem(i1.itemid).subscribe((l:any)=>{
                  this.orders[index].items[index1].it=l
                })
              }),
            console.log("Orders",this.orders)
          });
        })
      })
    });
   }

  ngOnInit(): void {
  }
}
