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
  userList = [];
  constructor(private router: Router, public userService: UserService, private http:HttpClient) { }

  ngOnInit(): void {
    localStorage.setItem('currentID', "");
    this.userService.getUsers().subscribe((data) =>{
      this.userList = data;
    })
  }

  DeleteUser(IdToDelete){
    this.userService.removeUser(IdToDelete).subscribe((data) =>{
      this.userList = data;
    })
  }


  IdToUpdate(IdToUpdate){
    localStorage.setItem('currentID' , IdToUpdate);
    this.router.navigateByUrl('profile');

  }


}
