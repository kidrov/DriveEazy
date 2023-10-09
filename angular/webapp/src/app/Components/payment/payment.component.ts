import { Component } from '@angular/core';
import { PaymentService } from './payment.service';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  order: any = {
    "email": "string",
    "phoneNumber": "string",
    "amount": 200000,
  }
  constructor(private _orderService: PaymentService) {



  }


  CreateOrder() {
    this._orderService.createOrder(this.order).subscribe(res => console.log(res)
    )
  }

  payNow() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 100000,
      name: 'RentOCar',
      key: 'rzp_test_0lqA5Pp4Li6KYq',
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: 'waqquas',
        email: 'waqquaskhan32@gmail.com',
        phone: '9898989898'
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed')
        }
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions, successCallback, failureCallback);
  }
}