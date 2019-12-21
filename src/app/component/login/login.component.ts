import { Component, OnInit } from '@angular/core';
import { WrappedNodeExpr } from '@angular/compiler';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  checkoutForm: any;

  constructor(
    public service: LoginService,
    public formBuilder: FormBuilder,
    public router: Router  
  ) {
    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit() {
  //  this.service.getCurrentUserName().next('');
    this.service.setLogout();
  }

  login(userInfo) {

    this.service.login(userInfo);

    if(this.service.getIsLogin()){
      this.router.navigateByUrl("\home");
      
    }else{
      this.checkoutForm.reset();
    }
  }

}
