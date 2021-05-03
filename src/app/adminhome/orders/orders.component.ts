import {Component, OnInit, ViewChild,} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';

import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material/sort';
import {OrderService} from '../../service/order.service'


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:any;

  displayedColumns: string[] = [ 'orderid','userid','orderdatetime','orderstatus','totprice' ];
  dataSource : MatTableDataSource<OrdersData>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private ser:OrderService) { 
    this.ser.getOrders().subscribe(
      e=>
        { console.log(e);
          this.orders=e;
        },
        error=>
        {
          console.log("Error: ",error);
          console.log("Unable to get orders")

        }
      );

   
    this.dataSource=new MatTableDataSource(this.orders);
    
      
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnChanges() {
  
     console.log(this.orders);
     this.dataSource=new MatTableDataSource(this.orders);
     console.log("updated datasource");
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }


  refreshit(){
    
    var temp=this;
    setTimeout(function()
    {
      
    
    temp.ser.getOrders().subscribe(
      e=>
        { console.log(e);
          temp.orders=e;
          temp.dataSource=new MatTableDataSource(temp.orders);
          console.log("refreshed");
          temp.dataSource.paginator = temp.paginator;
          temp.dataSource.sort = temp.sort;
        },
        error=>
        {
          console.log("Error: ",error);
          console.log("Unable to get orders")

        });

      },
      500); 
  }

}



export interface OrdersData {

  orderid :string,
  userid :string,
  orderdatetime : string, 
  orderstatus :string,
  totprice : number 
  
  
}