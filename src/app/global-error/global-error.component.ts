import { Component, OnInit } from '@angular/core';
import {SharedService} from '../services/shared.service';

@Component({
  selector: 'app-globla-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.css']
})
export class GlobalErrorComponent implements OnInit {

  errorMessage;
  errorStatus;

  constructor(private service: SharedService) { }

  ngOnInit() {
    this.errorMessage = this.service.errMessage;
    this.errorStatus = this.service.errStatus;
  }

}
