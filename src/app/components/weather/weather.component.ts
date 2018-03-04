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
  forecastData: object = {};
  cityPopulation:Number;
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
      this.weatherData['mainData'] = res.json()['main'];
      this.weatherData['fullForecast'] = res.json()['sys'];
      this.weatherData['weather'] = res.json()['weather'];
      this.weatherData['name'] = res.json()['name'];
      this.weatherData['wind']= res.json()['wind'];
      this.weatherData['coord'] = res.json()['coord']
      this.countryName = res.json()['sys']['country'];
      this.iconUrl = "http://openweathermap.org/img/w/" + res.json().weather[0]['icon'] + '.png';
      this.skyStatus = res.json().weather[0]['main'];
      this.description = res.json().weather[0]['description'];
      this.dataIn = true;
      this.countryCode = res.json()['sys']['id'];
      this.isQuickCity ? !this.isQuickCity : '';
      this.getForecast();
      return this.weatherData;
    });

  }


  getForecast() {
    var listArray = [];
    this.weatherService.getForecast(this.cityName, this.countryCode).subscribe((res: Response) => {
      this.forecastData['city'] = res.json()['city'];
      this.forecastData['list'] = [];
     this.cityPopulation = res.json().city['population'];
      var list = res.json().list;
      for (var i = 0; i < list.length; i++) {
        if (i == 9 || i == 17 || i == 25) {
          this.forecastData['list'].push(list[i]);

        }
      }
      var list2 = [];
      this.forecastData['list'].forEach(element => {
        element['forecastIcon'] = "http://openweathermap.org/img/w/" + element.weather[0]['icon'] + '.png'; 
        list2.push(element);
      });
      this.forecast = list2;
      return this.forecastData;
    })
  
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
