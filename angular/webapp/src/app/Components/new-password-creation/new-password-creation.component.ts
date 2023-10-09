import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthDbService } from 'src/app/services/auth-db.service';
import { changepass } from 'src/app/models/changepass';

@Component({
  selector: 'app-new-password-creation',
  templateUrl: './new-password-creation.component.html',
  styleUrls: ['./new-password-creation.component.css']
})
export class NewPasswordCreationComponent {

  constructor(private _authDbService: AuthDbService, private router: Router, private _http:HttpClient) {}


  bothPasswordMismatchError:string="";
  changepassobj:changepass = new changepass();
  newpasswordformsubmit(newpasswordform:any){
    if(newpasswordform.controls.newpasswordinput.value == newpasswordform.controls.newpasswordinputconfirm.value){
      console.log(newpasswordform.controls.newpasswordinput.value+"=======");
      if(sessionStorage.getItem("forgotOTP")!=null && sessionStorage.getItem("forgotEmail")!=null && sessionStorage.getItem("forgotOldPassword")!=null && sessionStorage.getItem("OTPVerified")!=null){
        this.changepassobj.email=sessionStorage.getItem("forgotEmail")!;
        this.changepassobj.oldPassword=sessionStorage.getItem("forgotOldPassword")!;
        this.changepassobj.newPassword=newpasswordform.controls.newpasswordinput.value;
        console.log("***"+sessionStorage.getItem("forgotEmail")+" "+sessionStorage.getItem("forgotOldPassword")+" "+newpasswordform.controls.newpasswordinput.value)
        this._authDbService.change_password(this.changepassobj).subscribe(res=>res);
        sessionStorage.removeItem("forgotEmail");
        sessionStorage.removeItem("forgotOldPassword");
        sessionStorage.removeItem("forgotOTP");
        sessionStorage.removeItem("OTPVerified");
        this.router.navigate(['login']);
      }
      else{
        this.router.navigate(['forgot-password']);
      }
    }
    else{
      this.bothPasswordMismatchError="Confirmation password must be same as new password";
    }
  }
}
