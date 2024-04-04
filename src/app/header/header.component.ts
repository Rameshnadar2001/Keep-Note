import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title: string = 'Keep Note';

  constructor(private router: Router) {}
  navigateToHome() {
    this.router.navigate(['notes']);
  }

  navigateToForm(){
    this.router.navigateByUrl("notes/register");
  }
}
