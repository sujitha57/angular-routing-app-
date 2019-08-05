import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../services/shared.service';
import {map, take} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {first} from 'rxjs/internal/operators/first';
import {filter} from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-people',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any = [];
  empDetails: any = [];
  empName: any = [];
  empAge: any = [];
  fName: any;
  users: any;
  status = false;
  first = false;
  private empUrl = 'http://dummy.restapiexample.com/api/v1/employees';
  constructor(private http: HttpClient, private service: SharedService) {
    // to get the employees using http response
    /*http.get(this.empUrl).subscribe(response => {
      this.employees = response;
    });*/

    http.get(this.empUrl).pipe(
      map(response => {
        this.employees = response;
      })).subscribe();
  }

  ngOnInit() {
  }
  getEmpDetails(empId) {
   const empDetailsUrl = 'http://dummy.restapiexample.com/api/v1/employee/' + empId;
   this.status = true;
   this.http.get(empDetailsUrl).subscribe(response => {
     this.empDetails = response;
     this.service.employeeDetails = response;
   });

   // get the first digit from the given data
   of(2, 4, 6).pipe(first(), map(x => console.log(x * 2))).subscribe();
  }

  getFirstName() {
    this.first = true;
    this.service.employees$.subscribe((res) => res);
    of(this.service.empAges).pipe(first()).subscribe(firstPersonAge => {
      console.log('first person age: ', firstPersonAge);
      this.empAge = firstPersonAge;
    });
    of(this.service.empNames).pipe(first()).subscribe(firstPersonName => {
      console.log('first person name: ', firstPersonName);
      this.empName = firstPersonName;
    });

    this.service.getEmpusingmapping();
    this.fName = this.service.fName;
  }

  createEmp(firstName: HTMLInputElement, lastName: HTMLInputElement,
            empId: HTMLInputElement, username: HTMLInputElement, pwd: HTMLInputElement ) {
    const emp: any = {
      fname: firstName.value,
      lname: lastName.value,
      empId: empId.value,
      userName: username.value,
      password: pwd.value
    };
    firstName.value = '';
    lastName.value = '';
    empId.value = '';

    const createUrl = 'http://dummy.restapiexample.com/api/v1/create';
    return this.http.post(createUrl, JSON.stringify(emp)).subscribe(res => {
      this.employees = res;
      alert('Employee form submitted');
    }, (err: Response) => {
      if (err.status === 405) {
        alert('405 error, method not allowed');
      }
    });
  }

  updateEmp() {
    const updateUrl = 'http://dummy.restapiexample.com/api/v1/update/21/';
    this.http.put(updateUrl, JSON.stringify({isRead: true})).subscribe(response => {
      this.users = response;
    }, (error: Response) => {
      if (error.status === 404) {
        alert('Page not found, 404 error');
      }
    });
  }
}
