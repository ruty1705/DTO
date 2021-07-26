import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Users } from '../model/Users'; 


@Injectable()

export class LoginService {
  url: string ;
  header: any;
  resOK: boolean;
  //statusResult: string;

  constructor(private _httpClient: HttpClient) {
   const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }


  Login(model: any) { 
    this.url = 'https://localhost:44371/api/Login';
    return this._httpClient.post<any>(this.url, model, { headers: this.header });
  }


  CreateUser(user: Users): Boolean {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };

    this.url = 'https://localhost:44371/api/Users';
    this._httpClient.post(this.url, user, httpOptions).subscribe(res => { 
      return res.statusText == "OK" ? this.resOK = true : this.resOK = false; 
    }, (err: HttpErrorResponse) => {
      return this.resOK = false; 
    });
    return false;
  }

}


