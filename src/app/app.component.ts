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
  public isLogin: boolean;

  constructor(public service: LoginService, public router: Router) {
    this.userName = '';
  }

  getIsLogin() {
    return this.isLogin;
  }
  logout(){
    this.service.logout();
    this.router.navigateByUrl("/login");
    this.isLogin = false;
  }

  ngOnInit() {
    this.service.getCurrentUser().subscribe(user=>{
        console.log("Hello2")
        console.log(user)
        if(user!=null){
          this.userName= user.name;
          this.isLogin = true;
        }
    })
  }
}
