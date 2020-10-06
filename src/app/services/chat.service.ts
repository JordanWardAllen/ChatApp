import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

const SERVER_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket;

  stringJson: any;
  stringObj: any[];

  constructor(private http: HttpClient ) { }



  public initSocket(): void{
    this.socket = io(SERVER_URL);
  }

  public onInit(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('chatMsg', (data:any) => observer.next(data));
    })
    return observable;
  }
  // public onMessage(): Observable<any> {
  //   let observable = new Observable(observer=>{
  //     this.socket.on('chatMsg', () => observer.next());
  //   })
  //   return observable;
  // }

  public test(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('test', (test) => observer.next(test));
    })
    return observable;
  }

  public sendtest(test: any): void {
    this.socket.emit('test', test);
  }
  // public sendMsg(chatMsg: any): void {
  //   this.socket.emit('chatMsg', chatMsg);
  // }

   public sendChat(chat: any): void {
    this.socket.emit('chat', chat);
  }




}
