import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from "../services/user.service";


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(public userService: UserService, private http:HttpClient, private router: Router) { }



  username : String = "";
  pwd : String = "";
  email : String = "";
  newUserRole : String = "";
  newUserCredentials = {};
  success = null;
  CurrentUserRole : String = localStorage.getItem('currentUserRole');
  isSuper : Boolean;

  ngOnInit(): void {
    if (localStorage.getItem('currentUserRole') == "Super" || localStorage.getItem('currentUserRole') == "Group Admin" ){
      this.isSuper = true;   
  } else {
      this.isSuper = false;
  }
  }


  createUser(username, pwd){
    this.CurrentUserRole = localStorage.getItem('currentUserRole');
    console.log(this.CurrentUserRole)
    if (this.CurrentUserRole == "Super"){
      this.newUserRole = "Group Admin"
      console.log('new user group admin')
    } else if (this.CurrentUserRole == "Group Admin"){
      this.newUserRole = "Group Assis"
      console.log('new user group assis')
    }
    let newUserCredentials = {username : this.username, pwd : this.pwd, email : this.email, role : this.newUserRole};
    this.userService.addUser(newUserCredentials).subscribe((data: any) => {
      console.log(data)
      this.success = data;
      if (this.success.valid == false){
        alert("This ID is not valid, please try another.")
      }else{ 
        this.router.navigateByUrl('');
      }
      })
    }
}
