import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private ser:LoginService,private router:Router){
    this.subscription = this.ser.currentMessage.subscribe(e => this.user=e)
  }
  onLogout()
  {
    this.ser.changeMessage('');
    this.router.navigate(['/home']);
  }
}
