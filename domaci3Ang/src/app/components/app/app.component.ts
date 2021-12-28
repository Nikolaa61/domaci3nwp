import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentRoles : string[] = [];

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentRoles();
  }

}
