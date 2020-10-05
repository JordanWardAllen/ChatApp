import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../services/user.service";
import { ImageUploadService } from "../services/image-upload.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  constructor(private router: Router, public userService: UserService, public imageUploadService: ImageUploadService, private http:HttpClient) { }

  selectedFile = null;
  imagePath = "";
  imagePath2 = "src/assets/";;
  
  
  

  imgSrc =  "";
  username  = "";
  pwd = "";
  id = "";
  role = "";
  email  = "";
  currentUserId = ""
  currentUser = {username : this.username, id : this.id, pwd: this.pwd, role : this.role, email : this.email }
  IdToUpdate = "";


  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('currentUserId');
    this.userService.getUser(this.currentUserId).subscribe((data) =>{
      // console.log(data)
      this.currentUser = data;
      this.username = data.username
      this.id = data.id
      this.pwd = data.pwd;
      this.email = data.email
      this.role = data.role;
      this.imgSrc = "assets/" + data.imgSrc;
      // console.log(this.imgSrc)
    })
  }


  UpdateUser(newUsername,newEmail, newRole, newPwd){
    let currentUser = {id: this.id, username: newUsername, pwd: newPwd, email : newEmail, role: newRole, imgSrc: this.imgSrc, valid : "true"};
    this.userService.updateUser(currentUser).subscribe((data: any) => {
      // console.log(currentUser);
      this.router.navigateByUrl('');
    })
  }


  onFileSelected(event){
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.imageUploadService.imgUpload(fd).subscribe(data =>{
      this.imagePath = data.filename;
      this.imgSrc = "assets/" + data.filename;
      // console.log(data.filename + ' , ' + data.size);
      console.log(data.filename)
    })
    // let currentUser = {id: this.id, username: this.username, pwd: this.pwd, email : this.email, role: this.role , imgSrc: this.imgSrc, valid : "true"};
    // this. UpdateUser(currentUser.username,currentUser.email, currentUser.role, currentUser.pwd, this.imgSrc){

    // }
  }
}
