import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  getUser(s:any){
    return this.http.get('http://localhost:62289/api/Userdetails/'+s);
  }
}
