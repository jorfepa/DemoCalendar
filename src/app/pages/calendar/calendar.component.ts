import { Component, OnInit } from '@angular/core';

import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Reminder } from 'src/app/models/reminder.model';

import * as moment from 'moment';
import { ReminderService } from 'src/app/services/reminder.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarPlugins = [dayGridPlugin, interactionPlugin];

  showModal: boolean = false;
  reminder = new Reminder();

  calendarReminders = [];
  reminders: Reminder[] = [];

  constructor(private reminderService: ReminderService) { }

  ngOnInit() {
    this.populateCalendar(this.reminderService.getList());
  }

  showEditReminder(calendarReminder) {
    this.reminder = this.reminderService.getById(calendarReminder.event.id);
    this.showModal = true;
    
  }

  addReminder(event) {
    this.reminder = new Reminder();
    this.reminder.Id = 0;
    this.reminder.DateTime = event.date;
    this.reminder.Color = '#8080ff'
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.populateCalendar(this.reminderService.getList());
  }
  
  populateCalendar(reminders: Reminder[]) {
    this.calendarReminders = [];
    reminders.forEach(reminder => {
      this.calendarReminders.push({
        id: reminder.Id,
        title: reminder.Title + ' (' + reminder.City + ')',
        start: reminder.DateTime,
        color: reminder.Color
      });
    });
  }
}
