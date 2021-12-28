import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../model";
import { JwtHelperService } from "@auth0/angular-jwt";
import {Router} from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[] = [];
  currentRoles : string[] = [];

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    if (localStorage.getItem("jwt") != null){
      // @ts-ignore
      const roles = helper.decodeToken(localStorage.getItem("jwt"));
      this.currentRoles = roles.permisije;
    }

    this.userService.getUsers().subscribe((users)=>{
      this.users = users;
    })
  }

  delete(id : number) {
    this.userService.delete(id).subscribe(any=>{
      for(let i = 0; i<this.users.length; i++){
        if(this.users[i].id === id){
          this.users.splice(i, 1);
        }
      }
    })
  }
}
