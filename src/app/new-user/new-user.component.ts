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



  newUsername : String = "";
  newUserPwd : String = "";
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

  // Creates a new user and assigns roles depending on currently logged user roles. After successful submission, page routes to the chat page.
  createUser(newUsername, newUserPwd){
    this.CurrentUserRole = localStorage.getItem('currentUserRole');
    if (this.CurrentUserRole == "Super"){
        this.newUserRole = "Group Admin"
    } else if (this.CurrentUserRole == "Group Admin"){
        this.newUserRole = "Group Assis"
    }

    if(newUsername && newUserPwd){
      let newUserCredentials = {username : this.newUsername, pwd : this.newUserPwd, email : this.email, role : this.newUserRole};
      this.userService.addUser(newUserCredentials).subscribe((data: any) => {
        this.success = data;
        if (this.success.valid == false){
          alert("This ID is not valid, please try another.")
        }else{ 
          this.router.navigateByUrl('');
        }
        })
    } else {
      alert("Please enter all values for a new user");
    }
  }
}
