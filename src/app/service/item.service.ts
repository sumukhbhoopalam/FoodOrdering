import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http:HttpClient) { }
  
  

  getItem(s:any):Observable<object>{
    return this.http.get('http://localhost:62289/api/items/'+s);
  }
  getItems():Observable<object>{
    return this.http.get('http://localhost:62289/api/items');
  }

  updateItem(id:string,s:any)
  {
    return this.http.put('http://localhost:62289/api/items/'+id,s);
  }

  PostItem(s:any)
  {
    return this.http.post('http://localhost:62289/api/items/',s);
  }

  DeleteItem(s:any)
  {
    return this.http.delete('http://localhost:62289/api/items/'+s);
  }

}
