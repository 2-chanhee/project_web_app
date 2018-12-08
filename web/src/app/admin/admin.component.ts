import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { User } from '../shared/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [UserService]
})
export class AdminComponent implements OnInit {
allUser : User[];
  constructor(private UserService: UserService, private router:Router) { }

  ngOnInit() {
    this.refreshEmployeeList();
  }

  refreshEmployeeList() {
    this.UserService.getUserList().subscribe((res) => {
      console.log(res);
      this.UserService.users= res as User[];//변경 
    });
  }
}
