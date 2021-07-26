import { Component } from '@angular/core';
import {  AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../model/Users';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})

export class RegisterComponent {
  data = false;
  userForm: FormGroup;;
  massage: string;
  isShowAllErrors: boolean;
  result: boolean;

  constructor(private _loginService: LoginService,
    private _router: Router  ) { }    


  ngOnInit() {
    this.userForm = new FormGroup({
      'UserName': new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5), Validators.pattern("[a-zA-Z-']*")]),
   
      'passwordFormGrp': new FormGroup({
        'Password': new FormControl('', [Validators.required, Validators.maxLength(10),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),

        'confrimPassword': new FormControl('', [Validators.required, Validators.maxLength(10),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
      }, this.paswordValidator),

      'Name': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(new RegExp(/^[\u0590-\u05FF A-Za-z]+$/i))]),
    });
  }


  onSubmit() {
    if (!this.userForm.valid) {
     this.isShowAllErrors = true;
      return;
    }
    const user = this.userForm.value;
    this.UserCreate(user);
  }

  //Save user (register)
  UserCreate(user: Users) {
    user.Password = this.userForm.controls.passwordFormGrp.value.Password;
    let res=   this._loginService.CreateUser(user);//Send to create user
    this.userForm.reset();
    this._router.navigate(['/login']);
  }
  
  //Check that password and password verification are equal
  paswordValidator(control: AbstractControl): ValidationErrors | null {
    if (control.get('Password').pristine || control.get('confrimPassword').pristine) return null;
    let password= control.get('Password').value;
    let confrimPassword = control.get('confrimPassword').value;
    let isMatch: boolean = password == confrimPassword;
    return isMatch ? null : <ValidationErrors>{ 'passwordotEqual': 'true' }
  }
}


//password
//At least 8 characters in length
//Lowercase letters
//Uppercase letters
//Numbers
//Special characters
