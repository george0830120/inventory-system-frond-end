import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { Subject } from "rxjs/Subject";
import { filter } from "rxjs/operators";
import { fakeUsers } from "../fakeUserData";
import { User } from "../model/user.model";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private users: Observable<User>;
  private currentUsername: Subject<string>;

  constructor() {
    this.users = from(fakeUsers.users);
    this.currentUsername = new Subject<string>();
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

  setCurrentUsername(name: string) {
    this.currentUsername.next(name);
  }

  getCurrentUserName() {
    return this.currentUsername;
  }

}
