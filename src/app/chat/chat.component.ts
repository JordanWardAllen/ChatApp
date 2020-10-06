import { Component, OnInit } from '@angular/core';
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
  channelSelected = "";
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
  this.getChannel();
}

public pickRoom(channelSelected){
  this.channelSelected = channelSelected;
  this.getMsg();
}

public getChannel(){
  this.chatService.sendchannel("test");
  this.ioConnection = this.chatService.channel().subscribe((channel: any)=> {
    this.listOfChannels.push(channel)
  });
}

public getMsg(){
  let fromChannel = this.channelSelected
  this.chatService.sendtest(fromChannel);
  this.ioConnection = this.chatService.test().subscribe((test: any)=> {
    this.messages = [];
      for (let i = 0; i < test.length; i++){
        this.messages.push(test[i].chatMsg);
      }
  });
}


public chat(chatMsg){
  this.newMessage = {chatMsg: this.chatMsg, channelName: this.channelSelected };
    if (this.chatMsg){
      this.chatService.sendChat(this.newMessage);
      this.chatMsg = null;
      this.getMsg();
    } else {
      console.log('Failed to send message. Make sure text box is not empty.')
    }
  }
}
