import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginService]
})
export class AppComponent {
  title = 'FoodOrdering';
  user:any = '';
  subscription:Subscription;
  constructor(private ser:LoginService){
    this.subscription = this.ser.currentMessage.subscribe(e => this.user=e)
  }
  onLogout()
  {
    this.ser.changeMessage('');
  }
}
