import { Component, OnInit } from '@angular/core';

import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import * as moment from 'moment';
import Swal from 'sweetalert2'

import { Reminder } from 'src/app/models/reminder.model';
import { ReminderService } from 'src/app/services/reminder.service';
import { Weather } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarPlugins = [dayGridPlugin, interactionPlugin];

  showModal: boolean = false;
  reminder = new Reminder();
  isEditing: boolean = false;
  weather = new Weather();

  calendarReminders = [];
  reminders: Reminder[] = [];

  // Code for the toast message
  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  constructor(private reminderService: ReminderService,
    private weatherService: WeatherService) { }

  ngOnInit() {
    this.populateCalendar(this.reminderService.getList());
  }

  async showEditReminder(calendarReminder) {
    this.reminder = this.reminderService.getById(calendarReminder.event.id);
    await this.getweather(this.reminder.City, this.reminder.DateTime);
    this.isEditing = false;
    this.showModal = true;
  }

  addReminder(event) {

    // Code for the confirmation message
    Swal.fire({
      title: 'What do you what to do?',
      text: "Add a new reminder or delete all reminders of " + moment(event.date).format('YYYY-MM-DD'),
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Add new',
      cancelButtonText: 'Delete all'
    }).then((result) => {
      if (result.value) {
        //Create a new reminder
        this.reminder = new Reminder();
        this.reminder.Id = 0;
        this.reminder.DateTime = event.date;
        this.reminder.Color = '#8080ff'

        this.isEditing = true;
        this.showModal = true;

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // Delete all reminders from the selected date
        this.deleteAllFromDate(event.date);
      }
    });
  }

  // Thw weather will be update when the view in the popup changed
  async setEditReminder(value) {
    await this.getweather(this.reminder.City, this.reminder.DateTime);
    this.isEditing = value;
  }

  closeModal() {
    this.showModal = false;
  }

  updateReminders() {
    this.populateCalendar(this.reminderService.getList());
  }

  deleteAllFromDate(date: Date) {
    // Filter the array to find the the reminders that match for the given date
    let reminders = this.reminderService.reminders;
    this.reminderService.reminders = reminders.filter(r => {
      return moment(r.DateTime).format('YYYY-MM-DD') != moment(date).format('YYYY-MM-DD')
    });

    this.toast.fire({icon: 'success',title: 'All the reminders were deleted correctly'});
    this.updateReminders();
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

  getweather(city: string, date: Date) {
    this.weatherService.getWeatherByCityAndDate(city, date)
      .subscribe(resp => {
        this.weather = resp;
      }, (error => {
        if (error.status == '404') {
          this.weather = new Weather();
          this.weather.Main = 'City not found';
          this.toast.fire({icon: 'error',title: 'The weather for this city does not exists'});
        }
      }));
  }
}
