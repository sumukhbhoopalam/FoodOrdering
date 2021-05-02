import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  getItem(s:any):Observable<object>{
    return this.http.get('http://localhost:62289/api/carts/'+s);
  }
  postItem(s:any):Observable<object>{
    return this.http.post('http://localhost:62289/api/carts/',s);
  }
  putItem(id:any,s:any):Observable<object>{
    return this.http.put('http://localhost:62289/api/carts/'+id,s)
  }
  deleteItem(s:any):Observable<object>{
    return this.http.delete('http://localhost:62289/api/carts/'+s);
  }
}
