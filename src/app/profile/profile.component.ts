import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, public userService: UserService, private http:HttpClient) { }
  username  = "";
  pwd = "";
  id = "";
  role = "";
  email  = "";
  currentUser = {}
  IdToUpdate = "";
 


  ngOnInit(): void {
    this.IdToUpdate =  localStorage.getItem('currentID');
    // Queries the MongoDB for the userID to update and displays query data in form.
    this.userService.getUser(this.IdToUpdate).subscribe((data) =>{
      this.currentUser = data;
      this.username = data.username
      this.id = data.id
      this.pwd = data.pwd;
      this.email = data.email
      this.role = data.role;
    })
  }
// Sends an update query to MongoDB.
  UpdateUser(username,email, role, pwd){
    let currentUser = {id: this.id, username: this.username, pwd: this.pwd, email : this.email, role: this.role, valid : "true"};
    this.userService.updateUser(currentUser).subscribe((data: any) => {
      this.router.navigateByUrl('');
    })
  }

}
