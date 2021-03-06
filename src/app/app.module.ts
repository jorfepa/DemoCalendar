import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { CalendarComponent } from './pages/calendar/calendar.component';
import { ReminderComponent } from './pages/reminder/reminder.component';
import { ViewReminderComponent } from './pages/view-reminder/view-reminder.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ReminderComponent,
    ViewReminderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
