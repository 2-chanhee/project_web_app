import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../environments/environment';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    _id: '',
    fullName: '',
    email: '',
    password: ''
  }
  users: User[];
 
  readonly baseURL = 'http://localhost:3000/user';

  noAuthHeader = {headers:new HttpHeaders({'NoAuth': 'True'})};

  constructor(private http: HttpClient) { }

  //http methods

  
 
  getUserList() {
    return this.http.get(environment.apiBaseUrl+'/admin');
  }

  putUser(user:User) {
    return this.http.put(environment.apiBaseUrl+ `/${user._id}`,user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register' ,user,this.noAuthHeader);
  }

  login(authCredentials){
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials);
  }

  setToken(token: string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserProfile(){
    return this.http.get(environment.apiBaseUrl + '/userprofile');
  }
  getUserEdit(){
    return this.http.get(environment.apiBaseUrl + '/useredit');
  }

  getUserPayload(){ //user profile에 토큰을 넘겨주기 위함
    var token = this.getToken();
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else  
      return false;
  }

  getDetails(check: string ) {
    console.log(this.baseURL+`/${check}`);
    return this.http.get(this.baseURL+ `/${check}`);
}

}
