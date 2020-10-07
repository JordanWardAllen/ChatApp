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

  public channel(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('channel', (channel) => observer.next(channel));
    })
    return observable;
  }

  public user(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('user', (user) => observer.next(user));
    })
    return observable;
  }

  public group(): Observable<any> {
    
    let observable = new Observable(observer=>{
      this.socket.on('group', (group) => observer.next(group));
    })
    
    return observable;
  }

  public sendtest(test: any): void {
    this.socket.emit('test', test);
  }

  public sendchannel(channel: any): void {
    this.socket.emit('channel', channel);
  }
  // public sendMsg(chatMsg: any): void {
  //   this.socket.emit('chatMsg', chatMsg);
  // }

   public sendChat(chat: any): void {
    this.socket.emit('chat', chat);
  }

  public sendUser(user: any): void {
    console.log('did something')
    this.socket.emit('user', user);
  }

  public sendGroup(group: any): void {
    this.socket.emit('group', group);
  }

  public assignUser(userAssignment): void {
    this.socket.emit('userAssignment', userAssignment);
  }


  public sendNewChannel(newChannel: any): void {
    console.log("new channel socket service fired")
    this.socket.emit('newChannel', newChannel);
  }





}
