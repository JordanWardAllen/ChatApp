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
  isInChannel = false;
  channelList = "";
  listOfChannels = [];

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
  let y = 'Channel 2'
  
  this.chatService.sendtest(y);
  this.ioConnection = this.chatService.test().subscribe((test: any)=> {
    this.messages = [];
    // console.log(test)
      for (let i = 0; i < test.length; i++){
        // console.log(test[0].chatHist[i].chatMsg)
        console.log(test[i].chatMsg)
      //   // let newMsg =  test[i].chatMsg
        this.messages.push(test[i].chatMsg);
        console.log(this.messages)
      }
  });
}


public chat(chatMsg){
  this.newMessage = {chatMsg: this.chatMsg, sender : localStorage.getItem('currentUser'), group: "group 1", channelName: "Channel 1" };
    if (this.chatMsg){
      this.chatService.sendChat(this.newMessage);
      this.chatMsg = null;
      this.getMsg();
    } else {
      console.log('Failed to send message. Make sure text box is not empty.')
    }
  }
}
