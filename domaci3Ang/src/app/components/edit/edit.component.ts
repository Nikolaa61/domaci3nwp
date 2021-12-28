import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private userService : UserService, private router: Router, private route: ActivatedRoute) { }

  ime : string ='';
  prezime: string = '';
  email: string = '';
  permisije: string[] = [];
  id : number = 0;
  password: string = '';

  ngOnInit(): void {
    //http://localhost:4200/edit/user2@gmail.com


    // @ts-ignore
    this.userService.getUser(this.route.snapshot.paramMap.get('email')).subscribe(user =>{
      this.ime = user.firstName;
      this.permisije = user.permisije;
      this.email = user.email;
      this.prezime = user.lastName;
      this.id = user.id;
      this.password = user.password;
    })
  }
  promeni() {
    this.userService.updateUser(this.id, this.email, this.password, this.ime, this.prezime, this.permisije).subscribe(user =>{
      this.router.navigate(['/']);
    })
  }
}
