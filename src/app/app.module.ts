import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { WeatherComponent } from './components/weather/weather.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './services/weather.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
