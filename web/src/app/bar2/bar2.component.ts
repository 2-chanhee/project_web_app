import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../shared/user.service';


@Component({
  selector: 'app-bar2',
  templateUrl: './bar2.component.html',
  styleUrls: ['./bar2.component.css']
})
export class Bar2Component implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  onLogout(){
    this.userService.deleteToken();
    alert("로그아웃 성공.");
    this.router.navigate(['/']);
  }

}
