import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messagecontent: string = "";
  messages  = [];
  newMessage = {};
  ioConnection: any;
  isValid: boolean = false

  constructor(private chatService : ChatService, private router: Router) { }

  ngOnInit(): void {
    this.initToConnection();
    this.getMsg();
    if (localStorage.getItem('valid')){
      this.isValid = true
      console.log(localStorage.getItem('valid'))
    }
  }

private initToConnection(){
  this.chatService.initSocket();
  this.ioConnection = this.chatService.onChat().subscribe((chat: any)=> {
    this.messages.push(chat);
  });

}

public getMsg(){
  
  this.ioConnection = this.chatService.onChat().subscribe((chat: any)=> {
    
    // console.log(chat.messagecontent)
    // this.messages.push(chat.messagecontent);
    // console.log(this.messages)
    // localStorage.setItem('userCount', getUsers.length)
    // for (let i = 0; i< chat.length; i++){
      
    //   this.messages = chat.messagecontent;
    //   console.log(this.messages)

    // }
  });
}


public chat(messagecontent){
  this.newMessage = {messagecontent: this.messagecontent};
    if (this.messagecontent){
      // console.log(this.messagecontent)
      this.chatService.sendChat(this.newMessage);
      this.messagecontent = null;
      
      // this.getMsg();
      // this.router.navigateByUrl('chat');

    } else {
      console.log('Failed to send message. Make sure text box is not empty.')
    }
  }
}
