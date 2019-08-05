import {Component, OnInit} from '@angular/core';
import {employees} from '../sharedData';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: any = employees;
  details: any = [];
  addEmployee = false;
  constructor() { }

  ngOnInit() {
    this.people = employees;
  }

  onNotify() {
    window.alert('notifying the price of product');
    console.log('notifying the output property');
  }

  getEmployeeDetails(employee) {
    this.details = employee;
  }

  createForm() {
    this.addEmployee = true;
  }

  addDetails(name, id, location) {
    const length = employees.length;
    employees[length] = {
      id: id.value,
      name: name.value,
      status: true,
      location: location.value,
      description: 'Employee of the TIBCO'
    };
  }
  formReset(name, id, location) {
    name.value = '';
    id.value = '';
    location.value = '';
  }
}
