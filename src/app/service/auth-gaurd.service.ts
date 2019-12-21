import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public service: LoginService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    var auth = false;
    this.service.getCurrentUser().subscribe(user=>{
        if(user!=null){
            console.log("I should go in")
            auth = true;
        }
    })
    if(!auth){
        this.router.navigateByUrl("/login");
    }
    else
        return true;
    
  }
}