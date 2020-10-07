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
  newChannelName = "";
  messages  = [];
  newMessage = {};
  newChannel = {};
  userAssignment = {};
  ioConnection: any;
  isValid: boolean = false
  isInChannel = false;
  channelSelected = "";
  groupSelected = "";
  groupSelectedToAssign = ""
  userSelected = "";
  listOfChannels = [];
  listOfGroups = [];
  listOfUsers = [];

  currentUser = localStorage.getItem('currentUser')
  currentUserRole = localStorage.getItem('currentUserRole')
  currentGroup = "";

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
  // this.getChannels();
  this.getGroups();
  this.getUsers();
}

public pickRoom(channelSelected){
  if (channelSelected){
    this.channelSelected = channelSelected;
    this.getMsg();
  } else {
    alert("Please select a channel before attempting to join");
  }

}


public pickGroup(groupSelected){
  
  if (groupSelected){
    localStorage.setItem('currentGroup', groupSelected);
    this.groupSelected = groupSelected;
    // console.log(groupSelected)
    // this.getUsers();
    this.getChannels();
  } else {
    alert("Please select a channel before attempting to join");
  }

}

public leaveRoom(){
  this.channelSelected = "";
  this.messages = [];

}

public getChannels(){
  this.listOfChannels = [];
  this.chatService.sendchannel(localStorage.getItem('currentGroup'));
  this.ioConnection = this.chatService.channel().subscribe((channel: any)=> {
    this.listOfChannels = channel
    // for (let i = 0; i< channel.length; i++){
    //   this.listOfChannels.push()
    // }
    // this.listOfChannels.push(channel)
    // console.log(this.listOfChannels)
    
  });
  // this.listOfChannels = []
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

public getUsers(){
  this.chatService.sendUser("worthless");
  this.ioConnection = this.chatService.user().subscribe((user: any)=> {
    this.listOfUsers.push(user)
  });
}

public getGroups(){
  this.listOfGroups = []
  this.listOfChannels = [];
  this.chatService.sendGroup(this.currentUser);
  this.ioConnection = this.chatService.group().subscribe((group: any)=> {
    this.listOfGroups = group
    // this.listOfGroups.push(group)
  });
}
public assignUser(groupSelectedToAssign, userSelected){
  this.userAssignment = {groupName : groupSelectedToAssign, username: userSelected}
  if (userSelected && groupSelectedToAssign){
    this.chatService.assignUser(this.userAssignment);
    // console.log(groupSelectedToAssign, userSelected)
  } else {
    alert("Please select both a group and user to assign before submitting")
  }
  
}


public chat(chatMsg){
  this.newMessage = {chatMsg: this.chatMsg, channelName: this.channelSelected };
    if (this.chatMsg){
      this.chatService.sendChat(this.newMessage);
      this.chatMsg = null;
      this.getMsg();
    } else {
      alert('Failed to send message. Make sure text box is not empty.')
    }
  }

  public createChannel(newChannelName){
    this.newChannel = {channelName :this.newChannelName, groupName: localStorage.getItem('currentGroup')};
      if (this.newChannelName){
        this.chatService.sendNewChannel(this.newChannel);
        this.newChannelName = null;
        this.getChannels();
      } else {
        alert('Failed to create new channel. Make sure text box is not empty.')
      }
    }
}
