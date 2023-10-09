import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from './model/Reservation';

@Injectable({
  providedIn: 'root'
})
export class BookingService {  
  private baseurl = "https://localhost:7264/upcoming?rentedByEmailid=";
  private apiUrl = "https://localhost:7264/past?rentedByEmailid=";
  private url1 = "https://localhost:7107/api/Inventory";

  constructor(private http: HttpClient) { }

  GetPastReservationsForUser(email: string) {
    const url1 = this.apiUrl+localStorage.getItem('logedin_user_email');
    return this.http.get<Reservation[]>(url1);
  }

  GetAllUpcomingReservationsForUser(email: string) {
    const url = this.baseurl+localStorage.getItem('logedin_user_email');   
    return this.http.get<Reservation[]>(url);
  }
  GetAlLCars() {
    const url = this.url1;   
    return this.http.get<Reservation[]>(url);
  }  
}
   

  

