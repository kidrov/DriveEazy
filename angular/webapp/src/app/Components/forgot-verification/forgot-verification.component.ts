import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-verification',
  templateUrl: './forgot-verification.component.html',
  styleUrls: ['./forgot-verification.component.css']
})
export class ForgotVerificationComponent {

  constructor(private router: Router) {}


  otpverificationfailedmsg:string="";
  otpverificationformsubmit(verificationform: any) {
    console.log(verificationform.controls.verificationotp.value+"-------");

    console.log(verificationform.controls.verificationotp.value.toString())
    console.log(sessionStorage.getItem('forgotOTP')+"--------------<<<<");


    if(sessionStorage.getItem("forgotOTP")==verificationform.controls.verificationotp.value.toString()){
      sessionStorage.setItem('OTPVerified', "true");
      this.router.navigate(['new-password-creation']);
    }
    else{
      this.otpverificationfailedmsg="*OTP Dont Match!!!";
    }
  }
}
