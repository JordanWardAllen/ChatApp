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

// Sends update query to MongoDO with current
  UpdateUser(newUsername,newEmail, newRole, newPwd){
    let currentUser = {id: this.id, username: newUsername, pwd: newPwd, email : newEmail, role: newRole, imgSrc: this.imgSrc, valid : "true"};
    this.userService.updateUser(currentUser).subscribe((data: any) => {
      this.router.navigateByUrl('');
    })
  }

// File selected event on Image selection
  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }
// New image file is uploaded to the src/assets file but currently can't display that image 
  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.imageUploadService.imgUpload(fd).subscribe(data =>{
      this.imagePath = data.filename;
      this.imgSrc = "assets/" + data.filename;
    })
  }
}
