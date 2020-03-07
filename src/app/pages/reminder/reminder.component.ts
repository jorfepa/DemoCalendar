import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
import { EventEmitter } from '@angular/core';
import { ReminderService } from 'src/app/services/reminder.service';
import { Reminder } from 'src/app/models/reminder.model';

import * as moment from 'moment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  @Input() public data: any;
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onCloseEdit = new EventEmitter();

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
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    })

    this.reminder.DateTime = new Date(f.controls['date'].value + ' ' + f.controls['time'].value);
    if (this.reminder.Id == 0) {
      this.reminderService.addReminder(this.reminder);
      Toast.fire({icon: 'success',title: 'Reminder created successfully'});
    }
    else {
      this.reminderService.editReminder(this.reminder);
      Toast.fire({icon: 'success',title: 'Reminder saved successfully'});
    }
    this.onCloseEdit.emit();
    this.onSave.emit();
  }

  delete() {
    Swal.fire({
      title: 'Are you sure to delete this reminder?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.reminderService.deleteReminder(this.reminder);
        this.onSave.emit();
        this.onClose.emit();
      }
    });
  }

  cancel(f: NgForm) {
    if (this.reminder.Id == 0) {
      this.onClose.emit();
    }
    else {
      this.onCloseEdit.emit(false);
    }
  }
}
