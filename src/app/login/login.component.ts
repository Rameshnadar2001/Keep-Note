import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { RouterServiceService } from '../services/router-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string ="";
  password: string ="";
  constructor(private authService: AuthServiceService, private routeService: RouterServiceService) { }

  ngOnInit(): void {
  }

  validateUser(){
    this.authService.login(this.email, this.password);
    const isValidUser = this.authService.isLoggedIn();
    if(isValidUser){
      this.routeService.navigateToNotesView();
    }
  }

}
