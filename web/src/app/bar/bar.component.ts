import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

}
