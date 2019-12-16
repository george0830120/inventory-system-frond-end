import { Component } from '@angular/core';
import { Router } from "@angular/router" ;
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventory-app-v2';
  userName: string;

  constructor(private service: LoginService) {
    this.userName = '';
  }

  isLogin() {
    if(this.userName === '')
      return false;
    else 
      return true;
  }
  
  ngOnInit() {
    this.service.getCurrentUserName().subscribe(username => {
      this.userName = username;
    })
  }
}
