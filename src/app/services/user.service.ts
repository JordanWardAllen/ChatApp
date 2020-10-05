import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from '../user';



const SERVER_URL = 'http://localhost:3000/'; 



@Injectable({
  providedIn: 'root'
})


export class UserService {


  constructor(private http: HttpClient) { }
  addUser(credentials){
    return this.http.post<any>("http://localhost:3000/api/add", credentials);
  }

  getUsers(){
    return this.http.get<any>("http://localhost:3000/api/read");
  }

  getUser(IdToUpdate){
    return this.http.post<any>("http://localhost:3000/api/getUser", {"id" : IdToUpdate});
  }

  updateUser(user: User){
    return this.http.post<any>("http://localhost:3000/api/update", user);
  }

  removeUser(IdToDelete){
    return this.http.post<any>("http://localhost:3000/api/remove", {"id" : IdToDelete});
  }

  auth(credentials){
    return this.http.post<any>("http://localhost:3000/api/auth", credentials);
  }
}
