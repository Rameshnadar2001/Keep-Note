import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterServiceService {
  constructor(private router: Router) {}

  navigateToNotesView() {
    this.router.navigate(['notes']);
  }

  navigateToLoginView() {
    this.router.navigate(['']);
  }
}
