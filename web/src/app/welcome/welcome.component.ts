import { Component,OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from "@angular/router";
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { User } from '../shared/user.model';

declare var M: any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [EmployeeService]
})

export class WelcomeComponent implements OnInit {


  searchForm: FormGroup;
  allPost: Employee[];
  currentUser: User;
  searchPost: Employee[] = [];
  searchClicked: boolean;
  countList: number = 20;
  
  S: number = 0;
  E: number = 50;


  constructor(fb: FormBuilder,private employeeService: EmployeeService,private router: Router) { 
    this.searchForm = fb.group({
      'searchTerm': [''],
      'searchText': ['']
    });
    this.searchClicked = false;
  }

  ngOnInit() {

    this.refreshEmployeeList();
   
  }


 

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.allPost = res as Employee[];//변경 
    });
  }


  goapplication(id: string ,category: string) {
    var check = localStorage.setItem('check', id);

    if(category == "F"){
      this.router.navigateByUrl('/view');
    }
   
  }

  onSearch(form: any) {
    var txt = form.searchText;
    if(txt != "") {
      this.searchPost = [];
      if(form.searchTerm == "") {
        alert('검색 조건을 선택하세요.');
        return;
      } 
      else if(form.searchTerm == "title") {
        for (var i=0; i<this.allPost.length; i++) {
          if(this.allPost[i].title.includes(txt)) {
            this.searchPost.push(this.allPost[i]);
          }
        }
      } 
      else if(form.searchTerm == "category") {
        for (var i=0; i<this.allPost.length; i++) {
          if(this.allPost[i].category.includes(txt)) {
            this.searchPost.push(this.allPost[i]);
          }
        }
      }
      if(this.searchPost[0] != null) {
        this.searchClicked = true;
      } else {
        this.searchClicked = false;
        alert("검색결과가 존재하지 않습니다.");
      }
    }
  }

}