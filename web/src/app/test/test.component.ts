
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';
import { UserService } from '../shared/user.service';
import { Employee } from '../shared/employee.model';
import { User } from '../shared/user.model';

declare var M: any;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [User]
})
export class TestComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

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
      this.userService.postUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
        alert("입력 완료.");
        this.router.navigate(['/']);
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
      //this.userService.user = res as User[];
    });
  }

  onEdit(user: User) {
    this.userService.selectedUser = user;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.refreshUserList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}

