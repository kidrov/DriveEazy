import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from 'src/Model/Review';
import { Carlist } from '../carlist/carlist.model';

@Injectable({
    providedIn: 'root'
})
export class cardescService {
    private apiUrl = 'https://localhost:7042/api/Review';

    private carUrl = "https://localhost:7107/api/Inventory";

    constructor(private _http: HttpClient) { }

    
   get_all_reviews():Observable<Review[]>{
    return  this._http.get<Review[]>(this.apiUrl);
   }

   get_car_description(carId:string):Observable<Carlist>{
    console.log(this.carUrl+"/"+carId);
    return this._http.get<Carlist>(this.carUrl+"/"+carId);
   }
   getreviewbycarid(carId:string):Observable<Review>{    
    return this._http.get<Review>(this.apiUrl+"/"+carId);

   }

   
}
