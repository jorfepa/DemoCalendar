import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Reminder } from 'src/app/models/reminder.model';

import * as moment from 'moment';

@Component({
  selector: 'app-view-reminder',
  templateUrl: './view-reminder.component.html',
  styleUrls: ['./view-reminder.component.scss']
})
export class ViewReminderComponent implements OnInit {

  @Input() public data: any;
  @Input() public weather: any;
  @Output() onClose = new EventEmitter();
  @Output() onEdit = new EventEmitter();

  reminder = new Reminder();
  imgPath: string = '';
  date: string;
  time: string;

  constructor(public router: Router) { }

  ngOnInit() {
    this.reminder = this.data;
    this.date = moment(this.reminder.DateTime).format('YYYY-MM-DD');
    this.time = moment(this.reminder.DateTime).format('hh:mm');
  }

  edit() {
    this.onEdit.emit(true);
  }

  close() {
    this.onClose.emit();
  }

}
