import { Component, OnInit, ɵsetCurrentInjector, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatMsg: string = "";
  messages  = [];
  newMessage = {};
  ioConnection: any;
  isValid: boolean = false

  constructor(private chatService : ChatService, private router: Router) { }

  ngOnInit(): void {
    this.initToConnection();
    if (localStorage.getItem('valid')){
      this.isValid = true
      console.log(localStorage.getItem('valid'))
    }
  }

private initToConnection(){
  this.chatService.initSocket();
  this.getMsg();


}

public getMsg(){
  let y = 'test1'
  this.chatService.sendtest(y);
  this.ioConnection = this.chatService.test().subscribe((test: any)=> {
    this.messages = [];
    for (let i = 0; i < test.length; i++){
      let newMsg =  {chatMsg : test[i].chatMsg, sender : test[i].sender, group: test[i].group , channel : test[i].channel }
      this.messages.push(newMsg);
    }
  });
}


public chat(chatMsg){
  this.newMessage = {chatMsg: this.chatMsg, sender : localStorage.getItem('currentUser'), group: "group 1", channel: "channel 1" };
    if (this.chatMsg){
      this.chatService.sendChat(this.newMessage);
      this.chatMsg = null;
      this.getMsg();
    } else {
      console.log('Failed to send message. Make sure text box is not empty.')
    }
  }
}
