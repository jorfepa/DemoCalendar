import { Component, OnInit } from '@angular/core';

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

  month = moment().month() + 1;
  monthString = moment().format('MMMM')
  year = moment().year();
  currentMothDays = 0;

  offset = 0;
  emptyDays: string[] = [];
  monthDays: string[] = [];

  showModal: boolean = false;
  reminder = new Reminder();
  isEditing: boolean = false;
  weather = new Weather();

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
    this.refreshCalendar();
  }

  async showEditReminder(reminder: Reminder) {
    this.reminder = this.reminderService.getById(reminder.Id);
    await this.getweather(this.reminder.City, this.reminder.DateTime);
    this.isEditing = false;
    this.showModal = true;
  }

  refreshCalendar() {
    this.monthDays = [];
    this.currentMothDays = moment(this.year + "-" + this.month, "YYYY-MM").daysInMonth();
    this.offset = moment(this.year + "-" + this.month + "-01").day();
    this.emptyDays = new Array(this.offset);

    // Filtering de reminders array by month and year and then the array is sorted.
    this.reminders = this.reminderService.reminders.filter(r =>
      (moment(r.DateTime).month() + 1 == this.month) && (moment(r.DateTime).year() == this.year)
    ).sort(function (a, b) {
      var dateA = new Date(a.DateTime), dateB = new Date(b.DateTime);
      return dateA.getTime() - dateB.getTime();
    });

    for (let i = 1; i <= this.currentMothDays; i++) {
      this.monthDays.push(i.toString());
    }
  }

  addReminder(day) {

    let date = new Date(this.year + '-' + this.month + '-' + day);

    // Code for the confirmation message
    Swal.fire({
      title: 'What do you what to do?',
      text: "Add a new reminder or delete all reminders of " + moment(date).format('YYYY-MM-DD'),
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
        this.reminder.DateTime = date;
        this.reminder.Color = '#8080ff'

        this.isEditing = true;
        this.showModal = true;

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // Delete all reminders from the selected date
        this.deleteAllFromDate(date);
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
    this.refreshCalendar();
  }

  deleteAllFromDate(date: Date) {
    // Filter the array to find the the reminders that match for the given date
    let reminders = this.reminderService.reminders;
    this.reminderService.reminders = reminders.filter(r => {
      return moment(r.DateTime).format('YYYY-MM-DD') != moment(date).format('YYYY-MM-DD')
    });

    this.toast.fire({ icon: 'success', title: 'All the reminders were deleted correctly' });
    this.updateReminders();
  }

  prevMonth() {
    this.year = this.month == 1 ? this.year - 1 : this.year;
    this.month = this.month == 1 ? 12 : this.month - 1;
    this.monthString = moment(this.month + '-01' + '-01').format('MMMM');
    this.refreshCalendar();
  }
  nextMonth() {
    this.year = this.month == 12 ? this.year + 1 : this.year;
    this.month = this.month == 12 ? 1 : this.month + 1;
    this.monthString = moment(this.month + '-01' + '-01').format('MMMM');
    this.refreshCalendar();
  }

  isWeekend(date: string) {
    if ((moment(date).weekday() == 0) || (moment(date).weekday() == 6))
      return true;
  }

  getweather(city: string, date: Date) {
    this.weatherService.getWeatherByCityAndDate(city, date)
      .subscribe(resp => {
        this.weather = resp;
      }, (error => {
        if (error.status == '404') {
          this.weather = new Weather();
          this.weather.Main = 'City not found';
          this.toast.fire({ icon: 'error', title: 'The weather for this city does not exists' });
        }
      }));
  }
}
