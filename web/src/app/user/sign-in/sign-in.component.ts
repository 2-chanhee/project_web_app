import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from '../../shared/user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService,private router : Router) { }

  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
   
  }

  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);

        if(this.model.email=='pppp@nate.com' && this.model.password=='123123'){
          alert('관리자입니다')
          this.router.navigateByUrl('/test');
        }
        if(this.model.email!='pppp@nate.com'){
          alert('로그인 성공');
          this.router.navigateByUrl('/');
        }
          
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}