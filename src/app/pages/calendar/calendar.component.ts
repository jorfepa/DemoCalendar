import { Component, OnInit } from '@angular/core';

//import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarPlugins = [dayGridPlugin, interactionPlugin];

  calendarReminders = [
    { title: 'event 1', start: '2020-03-02 14:30:00', color: 'yellow' },
    { title: 'event 1', start: '2020-03-02 17:30:00', color: 'green' },
    { title: 'event 2', date: '2020-03-04 18:15:00', color: 'blue' }];

  constructor() { }

  ngOnInit() {

  }

  editReminder(reminder) {
    console.log(reminder.event.title);
    console.log(reminder.event.start);
    console.log(reminder.event.backgroundColor);
    //this.calendarReminders = this.calendarReminders.concat(remider);
  }

  addReminder(event) {
    console.log(event);
  }

}
