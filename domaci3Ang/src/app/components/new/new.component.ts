import { Component, OnInit } from '@angular/core';
import {User} from "../../model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  user : User = {
    id : 0,
    email : '',
    password : '',
    firstName: '',
    lastName: '',
    permisije: []
  }

  message: string = '';
  newForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.newForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password:['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  dodaj() {
    console.log(this.user.permisije);
    this.userService.addUser(this.newForm.get('email')?.value, this.newForm.get('password')?.value, this.newForm.get('firstName')?.value, this.newForm.get('lastName')?.value, this.user.permisije).subscribe( user =>{
      this.newForm.reset();
      this.router.navigate(['/']);
      this.message = '';
    }, error => {
      this.message = 'Vec postoji taj email';
    });
  }
}
