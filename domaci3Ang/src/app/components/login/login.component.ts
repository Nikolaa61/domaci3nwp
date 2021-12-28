import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  email: string = '';
  password: string = '';

  errorMessage: string = '';
  greska: string = '';

  ngOnInit(): void {
  }

  login() {
    const jwt =  this.userService.login(this.email, this.password).subscribe(jwt =>{
      this.errorMessage = '';
      if(jwt != null){
        // @ts-ignore
        localStorage.setItem("jwt", jwt.jwt);

        this.userService.getUser(this.email).subscribe(user =>{
          this.userService.setUser(user);
          });

        if (localStorage.getItem("jwt") != null){
          const helper = new JwtHelperService();
          // @ts-ignore
          const roles = helper.decodeToken(localStorage.getItem("jwt"));
          this.userService.currentRoles = roles.permisije;
          if(roles.permisije.length === 0){
            alert("Nemas ni jednu permisiju!");
          }
        }
        this.router.navigate(['/']);
      }else{
        this.errorMessage='Pogresno korisnicko ime ili lozinka';
      }
      this.greska = '';
    }, error=>{
      this.greska = error.error;
    })

  }
}
