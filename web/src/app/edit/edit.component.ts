import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { Router } from '@angular/router';

declare var M: any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [EmployeeService]
})
export class EditComponent implements OnInit {
  info: infomation[];
  constructor(private employeeService: EmployeeService,private router:Router) { }

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
       
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        alert("입력 완료");
       this.router.navigateByUrl('/');
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
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