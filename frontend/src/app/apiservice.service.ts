import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  //connect frontend to backend

  apiUrl = 'http://localhost:3000/';

  //get all users from backend


  //MY NAME IS POSTMAN USE ME HAS POSTMAN
  getAllData(str : String):Observable<any>{
    return this._http.get(`${this.apiUrl+str}`);
    //return this._http.get(this.apiUrl);
  }

  postAllData(str : String, data : any):Observable<any>{
    return this._http.post(`${this.apiUrl+str}`, data);
  }
}
