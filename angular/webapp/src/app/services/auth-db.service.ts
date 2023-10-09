import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { credential } from '../models/credential';
import { changepass } from '../models/changepass';
import { jsDocComment } from '@angular/compiler';
import { reservation } from '../models/reservation';
import { newreservation } from '../models/newreservation';

@Injectable({
  providedIn: 'root'
})
export class AuthDbService {

  constructor(private _http: HttpClient) { }
  isLoggedIn: boolean = false;

  AuthDbBaseUrl:string="https://localhost:7118/api/Auth";
  SendOtpUrl:string="https://localhost:7024/Mail"
  ReservationUrl:string="https://localhost:7264/api/Reservation";

  login_user(loginobj:credential){
    return this._http.post<string>(
      this.AuthDbBaseUrl+"/login",
      JSON.stringify(loginobj),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        })
      }
    )
  }

  get_user_with_email(forgotemail:string){
    return this._http.get<credential>(
      this.AuthDbBaseUrl+"/"+forgotemail
    )
  }
  
  // /api/Auth/updatepassword
  change_password(changeobj:changepass){
    return this._http.post(
      this.AuthDbBaseUrl+"/updatepassword",
      JSON.stringify(changeobj),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        })
      }
    );
  }

  sendEmail(emailData: any) {
    // Define the email sending endpoint URL
    const emailEndpoint = this.SendOtpUrl + "/SendMail"; // Replace with the actual endpoint

    // Make an HTTP POST request to send the email
    return this._http.post(
      emailEndpoint,
      JSON.stringify(emailData),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        })
      }
    );
  }
  
  isAuthenticated(): boolean {
    // Check if the token is present in local storage
    const token = localStorage.getItem('token');
    
    // Return true if the token exists (user is authenticated), otherwise return false
    return !!token;
  }


  make_a_reservation(reservationObj:newreservation){
    console.log(reservationObj.reservationEndDate+" "+typeof(reservationObj.reservationStartDate)+"*******");
    return this._http.post<string>(
      this.ReservationUrl,
      JSON.stringify(reservationObj),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        })
      }
    )
  }

  
}
