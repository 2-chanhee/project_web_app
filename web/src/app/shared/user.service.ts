import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class UserService {
  selectedUser: User;
  users: User[];

  readonly baseURL = 'http://localhost:3000/users';

  noAuthHeader = {headers:new HttpHeaders({'NoAuth': 'True'})};

  constructor(private http: HttpClient) { }

  //http methods

 
  
 
  postUser2(user: User){
    return this.http.post(environment.apiBaseUrl+'/register' ,user,this.noAuthHeader);
  }///// 회원가입 메소드 할려고 함 

  putUser(user:User) {
    return this.http.put(this.baseURL+ `/${user._id}`,user);
  }

  postUser(user: User){
     return this.http.post(this.baseURL, user);
    }//지금 관리자용 

  getUserList() {
    return this.http.get(this.baseURL);
  }

  
  deleteUser(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }


  //////////////////////////////////////////////////////////


  login(authCredentials){
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials);
  }

  setToken(token: string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

   //admin
   setAdminToken(admintoken: string){
    localStorage.setItem('admintoken',admintoken);
  }

  getAdminToken(){
    return localStorage.getItem('admintoken');
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
