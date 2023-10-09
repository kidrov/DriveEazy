import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
    carImage: File | null = null;
    isDateInPast: boolean = false;
  // Define properties to hold form data
  carId: string = '';
  carBrand: string = '';
  carType: string = '';
  carName: string = '';
  registrationYear: string='';
  transmission: string = '';
  fuel: string = '';
  seat: number = 0;
  pricePerHour: number = 0.0;
  city: string = '';
  rating: number = 0.0;
  description: string = '';
  image: File | null = null;
  ownerEmail: string ='';


  constructor(private router:Router, private http: HttpClient) {}

  // Method to send data to the backend
  submitData(): void {
    const formData = new FormData();
    formData.append('carId', this.carId);
    formData.append('carBrand', this.carBrand);
    formData.append('carType', this.carType);
    formData.append('carName', this.carName);
    formData.append('registrationYear', this.registrationYear);
    formData.append('transmission', this.transmission);
    formData.append('fuel', this.fuel);
    formData.append('seat', this.seat.toString());
    formData.append('pricePerHour', this.pricePerHour.toString());
    formData.append('city', this.city);
    formData.append('rating', '0');
    formData.append('description', this.description);
    formData.append('ownerEmail', localStorage.getItem('logedin_user_email')!);
    
    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }

    // Define HTTP headers (optional)
    const headers = new HttpHeaders({
      'Authorization': 'Bearer YourAuthToken', // Include any authentication token if required
    });

    // Make an HTTP POST request to the backend API
    this.http.post('https://localhost:7107/api/Inventory', formData, { headers })
      .subscribe(
        (response) => {
            if(response === 201){
              console.log("inventory created successfully")
            // alert('Car added successfully');
            this.router.navigate(['/mycars']);
          // Reset form data after successful submission
          this.resetFormData();
            }
        }
      );
  }

  // Method to reset form data
  resetFormData(): void {
    this.carId = '';
    this.carBrand = '';
    this.carType = '';
    this.carName = '';
    this.registrationYear = '';
    this.transmission = '';
    this.fuel = '';
    this.seat = 0;
    this.pricePerHour = 0.0;
    this.city = '';
    this.rating = 0.0;
    this.description = '';
    this.image = null;
    this.ownerEmail='';
  }

  // Method to handle file input change event
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  validateDateInPast(): void {
    if (!this.registrationYear) {
      this.isDateInPast = false; // Reset the validation state if the input is empty
      return;
    }

    const inputDate = new Date(this.registrationYear);
    const currentDate = new Date();
    this.isDateInPast = inputDate < currentDate;
  }
}
