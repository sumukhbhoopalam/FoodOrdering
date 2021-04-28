import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: any) {
    this.messageSource.next(message)
    console.log(this.messageSource)
  }
  getUser(s:any){
    return this.http.get('http://localhost:62289/api/Userdetails/'+s);
  }
  updateUser(id:string,s:any)
  {
    return this.http.put('http://localhost:62289/api/Userdetails/'+id,s);
  }
}
