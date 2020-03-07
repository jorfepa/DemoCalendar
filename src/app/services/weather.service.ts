import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { Weather } from "../models/weather.model";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  //weather = new Weather();

  constructor(private http: HttpClient) { }

  getWeatherByCityAndDate(city: string, date: Date) {
    const start = moment();
    const end = moment(date);
    const days = end.diff(start, 'days') + 1;

    const url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&cnt=' + days + '&appid=88e5b2668afce966c2dd293bf9273e56';

    return this.http.get(url).pipe(
      map((resp: any) => {

        let weather = new Weather();

        weather.Id = resp.list[resp.list.length - 1].weather[0].id;
        weather.Code = resp.cod;
        weather.Message = resp.message;
        weather.Main = resp.list[resp.list.length - 1].weather[0].main;
        weather.Description = resp.list[resp.list.length - 1].weather[0].description;
        weather.Icon = resp.list[resp.list.length - 1].weather[0].icon;

        return weather;

      }));

  }
}
