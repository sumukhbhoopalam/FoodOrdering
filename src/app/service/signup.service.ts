import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  postUser(s:any){
    return this.http.post('http://localhost:62289/api/Userdetails/',s);
  }
}
