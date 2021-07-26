import { Router } from '@angular/router';    
import { LoginService } from '../services/login.service';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.componemt.html',

})
export class LoginComponent {

  model: any = {};
  errorMessage: string;

  constructor(private _router: Router,
              private _loginService: LoginService) { }


  ngOnInit() {
    sessionStorage.removeItem('UserName');
    sessionStorage.removeItem('userToken');
    sessionStorage.clear();
  }

  login() {
    debugger;
    this._loginService.Login(this.model).subscribe(
      (data: any) => {
        if (data.status == 1) {
          localStorage.setItem('userToken', data.access_token);
          this._router.navigate(['/list-waiting']);
        }
        else {
          this.errorMessage = "שם משתמש ו/או סיסמא שגויים נסה שוב.";
        }
      },
      (err: HttpErrorResponse) => {
        this.errorMessage = "תקלה בכניסה למערכת נסה שוב.";
      });
  };    
}
