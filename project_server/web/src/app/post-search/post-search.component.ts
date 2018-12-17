import { Component, OnInit ,Input  } from '@angular/core';
import { Employee } from '../shared/employee.model';

import { Router } from "@angular/router";

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {

  @Input() searchPost: Employee[];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goapplication(id: string ,category: string) {
    var check = localStorage.setItem('check', id);

    if(category == "F"){
      this.router.navigateByUrl('/view');
    }
   
  }

}
