import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ReminderComponent } from './pages/reminder/reminder.component';


const routes: Routes = [
  {path: '', component: CalendarComponent, data: {tittle: 'Calendar'}}/* ,
  {path: 'calendar', component: CalendarComponent, data: {tittle: 'Calendar'}},
  {path: 'reminder/:id', component: ReminderComponent, data: {tittle: 'Reminder'}} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
