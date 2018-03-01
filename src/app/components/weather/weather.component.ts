import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  cityName;
  units: String = 'imperial';
  isMetric: boolean;
  isImperial: boolean;
  weatherData: object = {};
  dataIn: boolean = false;
  isQuickCity: boolean = false;
  exampleCities: Array<String> = ['New York', 'San Francisco', 'Mumbai', 'Tokyo', 'London', 'Melbourne', 'New Delhi'];
  countryName: String;
  today = Date.now();
  condition: String;
  iconUrl: String;
  skyStatus: String;
  description: String;
  countryCode: Number;
  forecast: Array<object>;
  constructor(private weatherService: WeatherService) { }

  searchCity(city) {
    var data;
    if (this.isQuickCity) {
      if (city) {
        this.cityName = city;
      } else
        this.isQuickCity = false;
    }
    this.weatherService.getWeather(this.cityName, this.units).subscribe((res: Response) => {
      console.log(res.json())
      this.weatherData['mainData'] = res.json()['main'];
      this.weatherData['fullForecast'] = res.json()['sys'];
      this.weatherData['weather'] = res.json()['weather'];
      this.weatherData['name'] = res.json()['name'];
      this.countryName = res.json()['sys']['country'];
      this.iconUrl = "http://openweathermap.org/img/w/" + res.json().weather[0]['icon'] + '.png';
      this.skyStatus = res.json().weather[0]['main'];
      this.description = res.json().weather[0]['description'];
      this.dataIn = true;
      this.countryCode = res.json()['sys']['id'];
      console.log(this.weatherData);
      this.isQuickCity ? !this.isQuickCity : '';
      this.getForecast();
      return this.weatherData;
    });

  }


  getForecast() {
    this.weatherService.getForecast(this.cityName, this.countryCode).subscribe((res: Response) => {
      console.log(res.json(), 'forecast');
      this.forecast = res.json();
    })
    return this.forecast
  }

  quickCitySearch(city) {
    this.isQuickCity = true;
    this.searchCity(city)
  }


  ngOnInit() {
    this.isQuickCity = true;
    this.searchCity("New York");
  }
}
