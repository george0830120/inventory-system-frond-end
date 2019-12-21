import { Injectable } from "@angular/core";
import { Observable, from, of, BehaviorSubject } from "rxjs";
import { Subject } from "rxjs/Subject";
import { filter, first } from "rxjs/operators";
import { fakeUsers } from "../fakeUserData";
import { User } from "../model/user.model";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  public users: Observable<User>;
 // public currentUsername: BehaviorSubject<string>;
  public currentUser: BehaviorSubject<User>;
  public isLogin: boolean;
  // 1 for all CRUD
  // 4 least power
  public privilege: number;

  constructor() {
    this.users = from(fakeUsers.users); 
  //  this.currentUsername = new BehaviorSubject<string>('0');
    this.currentUser = new BehaviorSubject<User>(null);
    this.isLogin = false;
    this.privilege = -1;
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
    this.isLogin===false;
  }
  getIsLogin(){
    return this.isLogin;
  }

  login(userInfo){

      this.users.pipe(
        filter( user => user.name===userInfo.username )
        
      ).subscribe( user => {
          this.currentUser.next(user);
          this.isLogin = true;
          this.privilege = user.priviledge;
      });
    console.log(this.isLogin)
  }

  logout(){
    this.currentUser.next(null);
    this.isLogin = false;
  }

  getPriviledge() {
    return this.privilege;
  }

}
