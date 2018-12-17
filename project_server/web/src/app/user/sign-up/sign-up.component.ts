import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

import { UserService } from '../../shared/user.service';

import { User } from '../../shared/user.model';
declare var M: any;


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

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit() {
    this.resetForm();
    this.refreshUserList();
  }

  
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.userService.selectedUser = {
      _id: "",
      fullName: "",
      email: "",
      password: ""
    
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.userService.postUser2(form.value).subscribe((res) => {
        alert("회원가입 완료");
        this.router.navigateByUrl('/');
        this.resetForm(form);
        this.refreshUserList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshUserList() {
    this.userService.getUserList().subscribe((res) => {
      this.userService.users = res as User[];
    });
  }
  onEdit(user: User ,id: string) {
    this.userService.selectedUser = user;
    var check = localStorage.setItem('check', id);
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.refreshUserList();
        this.resetForm(form);

      
       
      });
    }
  }


}
