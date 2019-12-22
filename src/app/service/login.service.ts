import { Injectable } from "@angular/core";
import { Observable, from, of, BehaviorSubject } from "rxjs";
import { Subject } from "rxjs/Subject";
import { filter, first } from "rxjs/operators";
import { fakeUsers } from "../fakeUserData";
import { User } from "../model/user.model";
import { HttpClientService } from './http-client.service'

@Injectable({
  providedIn: "root"
})
export class LoginService {
  public users: Observable<User>;
 // public currentUsername: BehaviorSubject<string>;
  public currentUser: BehaviorSubject<User>;
  public isLogin: Subject<boolean>;
  // 1 for all CRUD
  // 4 least power
  public privilege: number;

  constructor(private httpService: HttpClientService) {
    this.users = from(fakeUsers.users); 
  //  this.currentUsername = new BehaviorSubject<string>('0');
    this.currentUser = new BehaviorSubject<User>(null);
    this.isLogin = new Subject<boolean>();
    //this.isLogin.next(false);
    this.privilege = 1;
  }

  getUsers(): any {
    return this.users;
  }

  getUserByName(name: string) {
    let user: User;
    this.users
      .pipe(filter(ur => ur.name === name))
      .subscribe(val => (user = val));
    return user;
  }

 // setCurrentUsername(name: string) {
 //   this.currentUsername.next(name);
 // }

  getCurrentUser() {
    return this.currentUser;
  }

  setLogout(){
    this.isLogin.next(false);
  }
  getIsLogin(){
    return this.isLogin;
  }

  login(userInfo){
    
    this.httpService.auth(userInfo.username, userInfo.password).subscribe(
      respond => {

        this.isLogin.next(true);
        this.privilege = Number(respond.body)
        var currentUser = new User(userInfo.name, this.privilege)
       // console.log(currentUser.name)
        this.currentUser.next(new User(userInfo.name, this.privilege));
      }
    )

    console.log(this.isLogin)
  }

  logout(){
    this.currentUser.next(null);
    this.isLogin.next(false);
  }

  getPriviledge() {
    return this.privilege;
  }

}
