import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
import { EventEmitter } from '@angular/core';
import { ReminderService } from 'src/app/services/reminder.service';
import { Reminder } from 'src/app/models/reminder.model';

import * as moment from 'moment';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  @Input() public data: any;
  @Output() onClose = new EventEmitter();

  reminder = new Reminder();
  date: string;
  time: string;

  constructor(public router: Router,
    private reminderService: ReminderService) { }

  ngOnInit() {
    this.reminder = this.data;
    this.date = moment(this.reminder.DateTime).format('YYYY-MM-DD');
    this.time = moment(this.reminder.DateTime).format('hh:mm');
  }

  save(f: NgForm) {
    if (!f.pristine)
      alert('Test pristine');
    this.reminder.DateTime = new Date(f.controls['date'].value + ' ' + f.controls['time'].value);
    if (this.reminder.Id == 0) {
      this.reminderService.addReminder(this.reminder); 
    }
    else{      
      this.reminderService.editReminder(this.reminder);
    }
    this.onClose.emit();
  }

  delete(f){
    this.reminderService.deleteReminder(this.reminder);
    this.onClose.emit();
  }
  
  cancel(f: NgForm) {
    this.onClose.emit();
  }
}
