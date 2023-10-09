import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent {
  rentDate: Date | null = null;
  returnDate: Date | null = null;


  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToCars() {
    console.log(this.rentDate, this.returnDate);
    this.router.navigate(['/cars'], {
      queryParams: { rentDate: this.rentDate, returnDate: this.returnDate },
    });
  }
}