import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpResponse  } from '@angular/common/http';
import { AuthDbService } from 'src/app/services/auth-db.service';
import { credential } from 'src/app/models/credential';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private _authDbService: AuthDbService, private router: Router, private _http:HttpClient) {}

  userFoundError :string="";
  forgotformsubmit(forgotform:any){
    console.log(forgotform.controls.forgotemail.value+"-------<------");
    try{
      this._authDbService.get_user_with_email(forgotform.controls.forgotemail.value).subscribe(res=>{
        if(res!=null){
          console.log(res);
          sessionStorage.setItem('forgotEmail', res.loginEmail);
          sessionStorage.setItem('forgotOldPassword', res.loginPassword);
          sessionStorage.setItem('forgotOTP', "2337");
          this.sendEmailToUser(res.loginEmail);
          this.router.navigate(['forgot-verification']);
        }
        else{
          this.userFoundError="No user found whith this email";
        }
      })
    }
    catch{
      this.userFoundError="somethimg went wrong";
    }
  }

  sendEmailToUser(emailToId: string) {
    // Retrieve the logged-in user's email from local storage
    const loggedInUserEmail = localStorage.getItem('logedin_user_email');

    // Check if the email is available in local storage
    if (loggedInUserEmail) {
      // Extract the name part before "@" from the email address
      const emailToName = loggedInUserEmail.split('@')[0];

      const emailData = {
        emailToId: loggedInUserEmail,
        emailToName: emailToName,
        emailSubject: 'OTP',
        emailBody: 'OTP for Changing the Password is:2337',
      };

      // Replace 'yourApiEndpoint' with the actual URL of your email-sending API.
      this._authDbService.sendEmail(emailData).subscribe(
        (response: any) => { // Use 'any' for the response type
          if (response.status = 200) {
            // Handle a 200 OK response
            console.log('Email sent successfully:', response);
            // You can add further handling for a successful response if needed
          } else {
            // Handle other response status codes here
            console.error('Unexpected response status code:', response.status);
          }
        },
        (error) => {
          // Handle error, e.g., show an error message
          console.error('Error sending email:', error);
        }
      );
    } else {
      // The logged-in user's email is not available in local storage
      console.error('Logged-in user email not found in local storage.');
    }
  }
}
  
