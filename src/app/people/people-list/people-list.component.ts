import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  @Input() peopleDetails;
  @Output() notify = new EventEmitter();
  constructor(private route: ActivatedRoute) { }
  itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
  data;

  ngOnInit() {
    localStorage.setItem('items', JSON.stringify(this.itemsArray));
    this.data = JSON.parse(localStorage.getItem('items'));
    this.route.paramMap.subscribe(params => {
      console.log(params);
    });
  }

  onAddItem(listItem) {
    this.itemsArray.push(listItem.value);
    localStorage.setItem('items', JSON.stringify(this.itemsArray));
  }

  clear(listItem) {
    localStorage.clear();
    this.itemsArray = [];
    listItem.value = '';
  }
}
