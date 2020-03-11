import { Injectable } from '@angular/core';
import { Reminder } from '../models/reminder.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  public reminders: Reminder[] = [
    { Id: 1, Title: "Event 1", City: "New York", DateTime: new Date('2020-03-02 14:30:00'), Color: '#ffff00' },
    { Id: 2, Title: "Event 2", City: "Quito", DateTime: new Date('2020-03-04 15:30:00'), Color: '#ff8080' },
    { Id: 3, Title: "Event 3", City: "Washington", DateTime: new Date('2020-03-05 16:30:00'), Color: '#0094FF' }];

  constructor() { }

  getList() {
    return this.reminders;
  }

  getById(id: number) {
    return this.reminders.find(r => r.Id == id);
  }

  addReminder(reminder: Reminder) {
    // Serching for the max object Id in the array
    let id = Math.max.apply(Math, this.reminders.map(function (r) { return r.Id; }))
    if (this.validateReminder(reminder)) {
      this.reminders.push({
        Id: id + 1,
        Title: reminder.Title,
        City: reminder.City,
        DateTime: reminder.DateTime,
        Color: reminder.Color
      });
      return id + 1;
    }
    else {
      return 0;
    }

  }
  validateReminder(reminder: Reminder) {
    if (reminder.Title.length > 30)
      return false;
    return true;
  }

  editReminder(reminder: Reminder) {
    if (this.validateReminder(reminder)) {
      let rem = this.getById(reminder.Id);
      let index = this.reminders.indexOf(rem);
      this.reminders[index].Title = reminder.Title;
      this.reminders[index].DateTime = reminder.DateTime;
      this.reminders[index].Color = reminder.Color;
      this.reminders[index].City = reminder.City;
    }
  }

  deleteReminder(reminder: Reminder) {
    let rem = this.getById(reminder.Id);
    let index = this.reminders.indexOf(rem);
    this.reminders.splice(index, 1);
  }
}
