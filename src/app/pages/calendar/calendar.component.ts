import { Component, OnInit } from '@angular/core';

import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Reminder } from 'src/app/models/reminder.model';

import * as moment from 'moment';
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
  weather=new Weather();

  calendarReminders = [];
  reminders: Reminder[] = [];

  constructor(private reminderService: ReminderService,
    private weatherService:WeatherService) { }

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
    this.reminder = new Reminder();
    this.reminder.Id = 0;
    this.reminder.DateTime = event.date;
    this.reminder.Color = '#8080ff'
    
    this.isEditing = true;
    this.showModal = true;
  }

  async setEditReminder(value){
    await this.getweather(this.reminder.City, this.reminder.DateTime);
    this.isEditing = value;
  }

  closeModal() {
    this.showModal = false;
  }
  
  updateReminders(){
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

  getweather(city: string, date:Date){
    this.weatherService.getWeatherByCityAndDate(city, date)
      .subscribe(resp => {
        this.weather = resp;
      });
  }
}
