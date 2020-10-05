import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  IdToDelete = "";
  UserList = [];
  constructor(private router: Router, public userService: UserService, private http:HttpClient) { }

  ngOnInit(): void {
    localStorage.clear();
    this.userService.getUsers().subscribe((data) =>{
      this.UserList = data;
    })
  }

  DeleteUser(IdToDelete){
    this.userService.removeUser(IdToDelete).subscribe((data) =>{
      this.UserList = data;
    })
  }


  IdToUpdate(IdToUpdate){
    localStorage.setItem('currentID' , IdToUpdate);
    this.router.navigateByUrl('profile');

  }


}
