import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getOrders():Observable<object>{
    return this.http.get('http://localhost:62289/api/orders');
  }

  getOrder(s:any):Observable<object>{
    return this.http.get('http://localhost:62289/api/orders/'+s);
  }
  postOrder(s:any):Observable<object>{
    return this.http.post('http://localhost:62289/api/orders/',s);
  }
  deleteOrder(s:any):Observable<object>{
    return this.http.delete('http://localhost:62289/api/orders/'+s);
  }
  getOrderItems(s:any):Observable<object>{
    return this.http.get('http://localhost:62289/api/cartsorder/'+s);
  }
}
