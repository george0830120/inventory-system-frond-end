import { Injectable } from '@angular/core';
import { Observable,from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fakeUsers } from '../fakeUserData';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private users: Observable<User>;
  constructor() {
    this.users = from(fakeUsers.users);
  }

  getUsers(): any{
    return this.users;
  }

  getUserByName(name: string) {
    let user : User;
    this.users.pipe(
      filter(ur => ur.name === name)
    ).subscribe(val => user = val);
    return user;
  }
}
