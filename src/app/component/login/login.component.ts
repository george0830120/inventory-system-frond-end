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
    private service: LoginService,
    private formBuilder: FormBuilder,
    private router: Router  
  ) {
    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit() {
    this.service.getCurrentUserName().next('');
  }

  login(userInfo) {
    let name = userInfo.username;
    let password = userInfo.password;
    let user;
    this.checkoutForm.reset();
    this.service.getUsers().pipe(
      filter(user => {
        if(user['name'] === name && user['password'] === password) {
          return true;
        }
        else 
          return false;
      }),
    ).subscribe(val => user = val);
    if(user) {
      localStorage['currentUser'] = user['name'];
      this.service.setCurrentUsername(user['name']);
      this.router.navigate(['/home']);
    }
  
  }

}
