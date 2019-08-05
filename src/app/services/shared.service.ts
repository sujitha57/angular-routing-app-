import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {first, map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Employees} from '../app.interfaces';

@Injectable()
export class SharedService implements ErrorHandler {

  private url = 'http://jsonplaceholder.typicode.com/posts';
  private empUrl = 'http://dummy.restapiexample.com/api/v1/employees';
  public observable$: Subscription;
  employees;
  empAges;
  empNames;
  fName;
  errMessage;
  errStatus;
  employeeDetails: any;
  constructor(private http: HttpClient, private injector: Injector) {
  }

  employees$ =  this.http.get<Employees[]>(this.empUrl).pipe(
    map(employees => {
      employees.map((employee) => {
        this.empAges = employee.employee_age;
        this.empNames = employee.employee_name;
      });
    }));

  getPosts() {
    this.employees = this.http.get(this.url);
    return this.employees;
  }

  createPosts(post) {
    return this.http.post(this.url, JSON.stringify(post));
  }

  updatePosts(post) {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}));
  }

  deletePosts(post) {
    return this.http.delete(this.url + '/' + post.id);
  }

  handleError(error: any): void {

    // to check global error handling change the type of any object in any component.

    const router = this.injector.get(Router);
    console.log('URL: ', router.url);
    if (error instanceof HttpErrorResponse) {
      this.errMessage = error.message;
      this.errStatus = error.status;
      console.log('error status message: ', error.status);
      console.log('Response body: ', error.message);
    } else {
      this.errMessage = error.message;
      console.log('An error occurred: ', error.message);
    }

    router.navigate(['/error']);
  }


  getEmpusingmapping() {

    /*this.observable$ = this.http.get<any>(this.empUrl).pipe( first(),
      map(employees => {
        employees.map(employee => ({
          ...employee,
          empAge: employee.employee_age + 5,
          searchKey: [employee.employee_name],
        })as Employees);
        console.log('employees: ', employees);
      })
    );*/


    this.observable$ = this.http.get<Employees[]>(this.empUrl).pipe(first(),
      map(employees => {
        employees.map(employee => {
          this.fName = employee.employee_name;
        });
      })
    ).subscribe();
    console.log('employee Name: ', this.fName);
  }
}
