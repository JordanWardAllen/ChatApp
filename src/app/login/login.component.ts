import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../services/user.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';


const backend_url = "http://localhost:3000";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email="";
  pwd="";
  credentials = {}
  ioConnection: any;
  isValid = ""

  constructor(private router: Router, public userService: UserService, private http:HttpClient) { }

  ngOnInit(): void {

    if (localStorage.getItem('valid') == "true"){
      this.isValid == "true"
      this.router.navigateByUrl('chat');
  } else {
      this.isValid == "false"
  }
}
  
  public login( pwd, email){
  
    this.credentials = {pwd: this.pwd,  email: this.email}
    this.userService.auth(this.credentials).subscribe((data: any) => {
      if (data.valid == "true"){
        this.isValid == "true";
        console.log(data)
        localStorage.setItem('valid', "true")
        localStorage.setItem('currentUser', data.username)
        this.router.navigateByUrl('chat');
      } else {
        alert('Credentials incorrect, please try again')
        this.isValid == "false"
      }
    });
  }
}
