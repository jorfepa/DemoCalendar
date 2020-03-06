import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullCalendarModule } from "@fullcalendar/angular";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { CalendarComponent } from './pages/calendar/calendar.component';
import { ReminderComponent } from './pages/reminder/reminder.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ReminderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
