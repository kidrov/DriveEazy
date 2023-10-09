import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, connect } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://api.razorpay.com/v1'; // Razorpay API
  private apiKey = 'rzp_test_0lqA5Pp4Li6KYq';
 

  constructor(private http: HttpClient) { }

createOrder(orderData: any): Observable<any> {
  const headers = new HttpHeaders({
    // Authorization: `Basic ${btoa(this.apiKey + ':')}`, // Use basic authentication with your API key
    'Content-Type': 'application/json',
    'Accept':'application/json'
  });

  // Make the request using Angular's HttpClient
  return this.http.post<any>('https://localhost:7203/api/OrderApi/initiateorder', JSON.stringify(orderData), { headers });
}
}
