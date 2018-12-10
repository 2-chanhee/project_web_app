import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers : [UserService]
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  onSubmit(form : NgForm){
    this.userService.postUser2(form.value).subscribe(
      res => {
        alert('회원가입 완료');
        this.resetForm(form);
      },
      err => {
        if(err.status == 422){
          alert('이메일 중복');
        } 
        else
          alert('db연결 오류');
      }
    );
  }

  resetForm(form: NgForm){
    this.userService.selectedUser = {
      _id:'',
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
