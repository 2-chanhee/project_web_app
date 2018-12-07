import { Component, OnInit ,Input  } from '@angular/core';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  
  @Input() searchPost: Employee[];
  constructor() { }

  ngOnInit() {
  }

}
