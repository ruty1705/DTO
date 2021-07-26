
import { Injectable } from '@angular/core'; 
import { Waiting } from '../model/Waiting';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs'
import { map, delay } from 'rxjs/operators';
//import 'rxjs/Rx';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';  


@Injectable()
export class WaitingService { 

  constructor(private _httpClient: HttpClient,
    private _http: Http
  ) { }

  //Get list waiting
  getWaitingList(): Observable<Waiting[]> {
    let obs: Observable<Waiting[]>;
    obs = this._httpClient.get<Waiting[]>('https://localhost:44371/api/Waiting')
      .pipe(map(
        (serverResponse) => {
          return serverResponse;
        }));
    return obs;
  }

  //Delete row
  deleteWaiting(id) {
    return this._http.delete('https://localhost:44371/api/Waiting/'+ id)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  //Update row
  updateWaiting(waiting: Waiting) {
    return this._http.put('https://localhost:44371/api/Waiting/', waiting)
        .map((response: Response) => response.json())
        .catch(this.errorHandler);
  }

  //Insert row
  InsertWaiting(waiting: Waiting) {
    debugger;
    return this._http.post('https://localhost:44371/api/Waiting/', waiting)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  //error
  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }  
}

  
