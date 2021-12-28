import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JWT, User} from "../model";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = environment.postApi

  currentRoles : string[] = [];

  private currentUser : User;

  constructor(private httpClient: HttpClient) {
    // @ts-ignore
    this.currentUser = null;
  }

  getUsers(): Observable<User[]>{

    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("jwt")}
    return this.httpClient.get<User[]>(`${this.apiUrl}/user/all`, {headers});
  }

  getUser(email: string): Observable<User>{
    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("jwt")}
    return this.httpClient.get<User>(`${this.apiUrl}/user/single/${email}`, {headers})
  }

  getCurrentUser(): User{
    return this.currentUser;
  }

  setUser(user: User) : void{
    this.currentUser = user;
  }
  addUser(email: string, password: string, firstName: string, lastName: string, permisije: string[]): Observable<User>{
    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("jwt")}
    return this.httpClient.post<User>(`${this.apiUrl}/user/create`, {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      permisije: permisije
    }, {headers})
  }

  updateUser(id: number, email: string, password: string, firstName: string, lastName: string, permisije: string[]): Observable<User>{
    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("jwt")}
    return this.httpClient.put<User>(`${this.apiUrl}/user/update`, {
      id: id,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      permisije: permisije
    }, {headers})
  }

  login(email: string, password: string): Observable<JWT>{

    return this.httpClient.post<JWT>(`${this.apiUrl}/auth/login`, {
      email: email,
      password: password
    })
  }

  delete(id: number): Observable<any>{
    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("jwt")}
    return this.httpClient.delete<any>(`${this.apiUrl}/user/${id}`, {headers});
  }


  getCurrentRoles(){
    if (localStorage.getItem("jwt") != null){
      const helper = new JwtHelperService();
      // @ts-ignore
      const roles = helper.decodeToken(localStorage.getItem("jwt"));
      this.currentRoles = roles.permisije;
    }
  }





}
