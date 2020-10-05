export class User  {
    email: string;
    pwd: string;
    role: string;
    userId: string;
    username: string;
    valid: string;
    constructor(email: string = "", pwd : string = "",role: string = "",userId: string = "", username:string = "", valid: string =""){
        this.email = email;
        this.pwd = pwd;
        this.role = role;
        this.userId = userId;
        this.username = username;
        this.valid = valid;
    }
}