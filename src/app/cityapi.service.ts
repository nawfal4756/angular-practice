import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityapiService {
  cities = ["Sialkot", "Rawalpindi", "Multan", "Lahore", "Karachi", "Islamabad", "Hyderabad", "Faisalabad"]
  constructor(private http: HttpClient) { }

  getCities() {
    return of(this.cities)
  }

  getAreas(city: string) {
    return this.http.get(`https://services.broadwaypizza.com.pk/BroadwayAPI.aspx?method=GetAreas&City=${city}`)
  }
}
