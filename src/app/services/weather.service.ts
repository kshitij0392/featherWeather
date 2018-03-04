import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/map";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class WeatherService {
  apiUrl: String = "http://api.openweathermap.org/data/2.5/weather?q=";
  apiKey: String = "a8c5cfee278a8f18b9010b3e58b0dd3b";
  forecastUrl: String = "http://api.openweathermap.org/data/2.5/forecast?q=";
   googleApiUrl:String = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="
  googleApiKey:String = "AIzaSyB89geSS5ysot5emmtJ4BQmnyd9uLre-xU";
  constructor(private http: Http) { }

  getWeather(cityName, units) {
    return this.http.get(this.apiUrl + cityName + "&units=" + units + "&appid=" + this.apiKey);
  }
  getForecast(cityName, countryCode) {
    return this.http.get(this.forecastUrl + cityName + ',' + countryCode + "&units=imperial" + "&appid=" + this.apiKey);
  }

  // getCitiNames(name) {
  //   console.log(name)
  //   return this.http.get(this.googleApiUrl+name+"&types=(cities)&key="+this.googleApiKey);
  // }

}
