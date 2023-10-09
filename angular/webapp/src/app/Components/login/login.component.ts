import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthDbService } from 'src/app/services/auth-db.service';
import { credential } from 'src/app/models/credential';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private _authDbService: AuthDbService, private router: Router, private _http:HttpClient) {}

    loginobj:credential=new credential();
    loginErrorMsg:string="";
    loginformsubmit(loginform: any) {
      console.log(loginform.controls.loginemail.value+"   "+loginform.controls.loginpassword.value+"******")
      this.loginobj.loginEmail=loginform.controls.loginemail.value;
      this.loginobj.loginPassword=loginform.controls.loginpassword.value;
      try{
        this._authDbService.login_user(this.loginobj).subscribe(res=>{
          if(res==""){
            this.loginErrorMsg="Wrong Credentials";
          }
          else{
            console.log(res);
            this._authDbService.isLoggedIn=true;
            localStorage.setItem('token', res.toString());
            localStorage.setItem('logedin_user_email', loginform.controls.loginemail.value);
            this.router.navigate(['cars']);
          }
        });
      }
      catch{
        this.loginErrorMsg="Something went wrong";
      }
    }

    ngOnInit(): void {
    }

}
