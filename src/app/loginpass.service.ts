import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginpassService {

  userid:BehaviorSubject<string> = new BehaviorSubject<string>("userid");
  role:BehaviorSubject<string> = new BehaviorSubject<string>("role");
  email:BehaviorSubject<string> = new BehaviorSubject<string>("email");

  constructor() { 
    

  }
}