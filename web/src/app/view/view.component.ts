import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [EmployeeService]
})
export class ViewComponent implements OnInit {
  info: infomation[];

  constructor(private employeeService: EmployeeService,private router: Router) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
    var check = localStorage.getItem('check');
    this.employeeService.getDetails(check).subscribe((res: any) => {
      this.info = [res];
      console.log(this.info);
    });
  }

  
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      category: "",
      title: "",
      content: "",
      price: "",
      imgurl: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee ,id: string) {
    this.employeeService.selectedEmployee = emp;
    var check = localStorage.setItem('check', id);
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

  goapplication(id: string ,category: string, title: string, content: string, price: string, imgurl: string) {
    var check = localStorage.setItem('check', id);

    if(category == "F"){
      this.router.navigateByUrl('/write');
    }
   
  }

}

interface infomation{
  _id: string;
  category: string;
  title: string;
  content: string;
  price: string;
  imgurl: string;
}
