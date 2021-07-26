import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.componemt.html'
})

export class HeaderComponent {
  constructor(private _router: Router) { };

  Logout() {
    localStorage.removeItem('userToken');
    this._router.navigate(['/login']);
  }
}
