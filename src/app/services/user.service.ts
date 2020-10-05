import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { socket } from 'socket.io-client';



const SERVER_URL = 'http://localhost:3000/'; 

interface POST {
  title: string;
  body: string
};


interface POST {
  title: string;
  body: string
};

@Injectable({
  providedIn: 'root'
})


export class UserService {
  url = "";
  body = "";
  jsonItems = {};
  private socket;

  setItem(key, item){
    this.jsonItems[key] = item
  }
  getItem(key){
    return this.jsonItems[key];
  }

  getData(){
    this.http.get<POST>(this.url).subscribe(res => {
      this.body = res.body;
      console.log(res.body);
    })
  }

  constructor(private http: HttpClient) { }
  postData(){
    this.http.post<POST>(this.url , this.body).subscribe(
      res => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
  );
  }
  public initSocket(): void {
    this.socket = socket(SERVER_URL);    
  }


  public sendAuth(auth: any): void {
    this.socket.emit('auth', auth);
  }

  public sendNewUser(user: any): void {
    this.socket.emit('user', user);
  }

  public sendDeletedUser(deletedUserId: any): void {
    this.socket.emit('deletedUserId', deletedUserId);
  }

  public sendUpgradeUser(userIdToUpgrade: any): void {
    this.socket.emit('userIdToUpgrade', userIdToUpgrade);
  }

  


  // public onSubmit(): Observable<any> {
  //   let observable = new Observable(observer=>{
  //     this.socket.on('user', (data: any) => observer.next(data));
  //   })
  //   return observable;
  // }

  public onInit(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('getUsers', (data: any) => observer.next(data));
    })
    return observable;
  }


  public onDelete(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('users', (data: any) => observer.next(data));
    })
    return observable;
  }

  public onLogin(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('auth', (data: any) => observer.next(data));
    })
    return observable;
  }
}
