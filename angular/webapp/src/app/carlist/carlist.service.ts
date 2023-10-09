import { Injectable } from '@angular/core';
import { Carlist } from './carlist.model';
import { reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarlistService {
  url = "Inventory"
  reservationURL = "https://localhost:7264/api/Reservation"
  constructor(private http:HttpClient){}
  public GetAll(): Observable<Carlist[]>{
    return this.http.get<Carlist[]> (`${environment.apiUrl}/${this.url}`) 
  };


  public get_all_reservations():Observable<reservation[]>{
    return this.http.get<reservation[]>(this.reservationURL);
  }

  updateInventory(carId: string, formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Inventory/${carId}`, formData);
  }

  getInventory(carId: string): Observable<any> {
    // Construct the URL for fetching a specific inventory item
    const url = `${environment.apiUrl}/Inventory/${carId}`; // Adjust the URL as per your API structure
    return this.http.get(url);
  }
  getCarById(carId:string): Observable<Carlist>{
        const url=`${environment.apiUrl}/Inventory/${carId}`;
        return this.http.get<Carlist>(url);
    
      }
  Update(carId:string, formData:any){
   return this.http.put(`${environment.apiUrl}/Inventory/${carId}`, formData, {responseType : 'text' as 'json'})
  }
}
