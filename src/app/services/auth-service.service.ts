import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  loggedIn = false;

  login(email:string, password:string){
    this.loggedIn = email === 'james@gmail.com' && password === 'James@123';
  }

  logout(){
    this.loggedIn = false;
  }

  isLoggedIn(){
    return this.loggedIn;
  }
}
