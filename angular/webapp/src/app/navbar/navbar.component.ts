import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthDbService } from '../services/auth-db.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = this._authDb.isLoggedIn;
  isLoginPage: boolean = false;

  constructor(private router: Router,private _authDb:AuthDbService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current page is the login page
        this.isLoginPage = event.url === '/login';
        console.log( this._authDb.isLoggedIn);
      }
    });
  }
  

  login() {
    // Your login logic here
    this._authDb.isLoggedIn = true;
  
    this.isLoggedIn=this._authDb.isLoggedIn;
  }

  logout() {
    // Your logout logic here
    localStorage.removeItem('token');
    localStorage.removeItem('logedin_user_email');
    this._authDb.isLoggedIn = false;
    this.router.navigateByUrl('/login');

  }

  redirectToHomePage() {
    // Redirect to the home page when the icon is clicked
    this.router.navigateByUrl('/home');
  }
}
