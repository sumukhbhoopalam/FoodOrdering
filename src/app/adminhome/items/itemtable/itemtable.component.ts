import {Component, OnInit, ViewChild,Input,Output, EventEmitter} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';

import {MatTableDataSource} from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'nested-item-table',
  templateUrl: './itemtable.component.html',
  styleUrls: ['./itemtable.component.css']
})
export class ItemtableComponent implements OnInit {

  
  @Input('itemslist') items1:any;
  @Output()
    ChildEvent = new EventEmitter();



   displayedColumns: string[] = ['itemid','quantity','itemname','category','price','description','veg','image','ratings'];
  dataSource : MatTableDataSource<ItemData>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


 

  constructor() { 
    this.dataSource=new MatTableDataSource(this.items1);
    //this.dataSource.paginator = this.paginator;
    console.log("in nested component :" ,this.items1);
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
  
     console.log(this.items1);
     this.dataSource=new MatTableDataSource(this.items1);
     console.log("updated datasource");
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }
}

  

export interface ItemData {
  itemid :number,
  quantity : number,
  itemname :string,
  category :string,
  price :number, 
  description :string,
  veg :boolean, 
  image :string,
  ratings : number
  
}


