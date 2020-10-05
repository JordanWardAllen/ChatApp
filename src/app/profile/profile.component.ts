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
  role = "";
  email  = "";
  currentUser = {}
  IdToUpdate = "";
 


  ngOnInit(): void {
    this.IdToUpdate =  localStorage.getItem('currentID');
    this.userService.getUser(this.IdToUpdate).subscribe((data) =>{
      this.currentUser = data;
      this.username = data.username
      this.pwd = data.pwd;
      this.email = data.email
      this.role = data.role;
    })
  }

  UpdateProduct(username, pwd, email, role){
    let currentUser = {userId: this.IdToUpdate, username: this.username, pwd: this.pwd, email : this.email, role: this.role, valid : "true"};
    this.userService.updateUser(currentUser).subscribe((data: any) => {
      console.log(currentUser);
      this.router.navigateByUrl('');
    })
  }

}
