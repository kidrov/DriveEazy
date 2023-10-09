import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cardescService } from 'src/app/cardescription/cardesc.service';
import { Carlist } from 'src/app/carlist/carlist.model';
import { PaymentService } from '../payment/payment.service';
import { reservation } from 'src/app/models/reservation';
import { AuthDbService } from 'src/app/services/auth-db.service';
import { newreservation } from 'src/app/models/newreservation';


declare var Razorpay: any;

@Component({
  selector: 'app-acknoledgment',
  templateUrl: './acknoledgment.component.html',
  styleUrls: ['./acknoledgment.component.css']
})
export class AcknoledgmentComponent implements OnInit {

  startDateTime: Date = new Date();
  endDateTime : Date = new Date();
  localCity : string="";
  totalHours : number=0;

  Conviencefee : number = 100;
  mulPrice : number =1;
  TotalPrice :number=0;

  perHourPricec : number = 0;

  carDesc:Carlist=new Carlist();
  reservationObj:newreservation = new newreservation();

  
  //city_input   start_input  end_input

  // order: any = {
  //   "email": "string",
  //   "phoneNumber": "string",
  //   "amount": localStorage.getItem('TotalPrice'),
  // }

  constructor(private _authDbService: AuthDbService,private _cardescService: cardescService, private _Aroute:ActivatedRoute, private router: Router, private _orderService: PaymentService) {
    if(this._Aroute.snapshot.params['carId']!=null && this._Aroute.snapshot.params['carId'].length>0){
      this._cardescService.get_car_description(this._Aroute.snapshot.params['carId']).subscribe(res=>{
        this.carDesc=res;
        this.perHourPricec=res.pricePerHour;
        console.log(this.perHourPricec);
        this.putprice();
      })
    }
    console.log('ctor called');

    
  }

  ngOnInit(): void {
    this.startDateTime = new Date(localStorage.getItem('start_input')!);
    this.endDateTime = new Date(localStorage.getItem('end_input')!);
    this.localCity = localStorage.getItem('city_input')!;

    const timeDiff = Math.abs(this.endDateTime.getTime() - this.startDateTime.getTime());
    this.totalHours = timeDiff / (1000 * 3600);
    console.log('oninit called'+this.totalHours+" "+this.carDesc.pricePerHour);



  }

  putprice(){
    this.mulPrice = this.totalHours * this.perHourPricec;
    this.TotalPrice = this.mulPrice+this.Conviencefee;
    localStorage.setItem('TotalPrice', this.TotalPrice.toString());
    console.log("price updated", this.TotalPrice);
  }


  payNow(){

    const order: any = {
      "email": "string",
      "phoneNumber": "string",
      "amount": localStorage.getItem('TotalPrice'),
    }


    this._orderService.createOrder(order).subscribe(res =>
      { 
        console.log(res);
        localStorage.setItem('order_id', res.orderId);
        // console.log()
      });

    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      order_id: localStorage.getItem('order_id'),
      currency: 'INR',
      amount: localStorage.getItem('TotalPrice'),
      name: 'DriveEasy',
      key: 'rzp_test_0lqA5Pp4Li6KYq',
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      
      prefill: {
        name: 'waqquas',
        email: 'waqquaskhan32@gmail.com',
        phone: '8434983681'
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
          this.reservationObj.rentedByEmailid = localStorage.getItem('logedin_user_email')!;
          this.reservationObj.reservationDate = localStorage.getItem('logedin_user_email')!
          this.reservationObj.reservationStartDate =  localStorage.getItem('start_input')?.toString()!;
          this.reservationObj.reservationEndDate = localStorage.getItem('end_input')?.toString()!;
          this.reservationObj.carId = this.carDesc.carId;
    
          this._authDbService.make_a_reservation(this.reservationObj).subscribe(res=>res);
          this.router.navigate(['cars']);
        }
      }

    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
      this.reservationObj.rentedByEmailid = localStorage.getItem('logedin_user_email')!;
      this.reservationObj.reservationDate = localStorage.getItem('start_input')?.toString()!;
      this.reservationObj.reservationStartDate =  localStorage.getItem('start_input')?.toString()!;
      this.reservationObj.reservationEndDate = localStorage.getItem('end_input')?.toString()!;
      this.reservationObj.carId = this.carDesc.carId;

      this._authDbService.make_a_reservation(this.reservationObj).subscribe(res=>res);
      this.router.navigate(['cars']);

    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions, successCallback, failureCallback);

    this.reservationObj.rentedByEmailid = localStorage.getItem('logedin_user_email')!;
    this.reservationObj.reservationDate = localStorage.getItem('start_input')?.toString()!;
    this.reservationObj.reservationStartDate =  localStorage.getItem('start_input')?.toString()!;
    this.reservationObj.reservationEndDate = localStorage.getItem('end_input')?.toString()!;
    this.reservationObj.carId = this.carDesc.carId;

    this._authDbService.make_a_reservation(this.reservationObj).subscribe(res=>{
      console.log(res+" reservation called +++++++++="+this.reservationObj);
    });
    this.router.navigate(['cars']);

  }

}
