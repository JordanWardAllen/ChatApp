import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatService } from "./services/chat.service";
import { UserService } from "./services/user.service";
import { ImageUploadService } from "./services/image-upload.service";
import { ProfilesComponent } from './profiles/profiles.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    NewUserComponent,
    ProfileComponent,
    ProfilesComponent,
    ProfileSettingsComponent
  ],
  imports: [
    BrowserModule, RouterModule,AppRoutingModule, FormsModule, HttpClientModule, CommonModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
