import { Component, OnInit } from '@angular/core';
import { CarlistService } from '../carlist/carlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit{

  carId: string='';
  carBrand: string='';
  carType:string='';
  carName:string='';
  registrationYear:string='';
  transmission:string='';
  fuel:string='';
  seat:number=0;
  pricePerHour:number=0.0;
  city : string='';
  rating:string='';
  description:string='';
  image: File | null = null;
  ownerEmail:string='';

  constructor(private carlistService:CarlistService, private route:ActivatedRoute,private http:HttpClient, private router:Router){}

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('carId') || '';
    this.carlistService.getCarById(this.carId).subscribe(
      (data) => {
        this.carBrand = data.carBrand;
        this.carType = data.carType;
        this.carName = data.carName;
        this.registrationYear = data.registrationYear;
        this.transmission = data.transmission;
        this.fuel = data.fuel;
        this.seat = data.seat;
        this.pricePerHour = data.pricePerHour;
        this.city = data.city;
        this.rating = data.rating;
        this.description = data.description;
        this.ownerEmail = data.ownerEmail;
      },
      (error) => {
        console.error('Error fetching car details:', error);
      }
    );
  }
  getImageSrc(carImage: string): string {
    if (carImage) {
      return 'data:image/png;base64,' + carImage;
    }
    return ''; // Return an empty string if no image data is available
  }

  onSubmit(){
    const formData=new FormData();
    formData.append('carBrand',this.carBrand);
    formData.append('carType',this.carType);
    formData.append('carName',this.carName);
    formData.append('registrationYear',this.registrationYear);
    formData.append('transmission',this.transmission);
    formData.append('fuel', this.fuel);
    formData.append('seat', this.seat.toString());
    formData.append('pricePerHour', this.pricePerHour.toString());
    formData.append('city', this.city);
    formData.append('rating', this.rating.toString());
    formData.append('description', this.description);
    formData.append('ownerEmail', this.ownerEmail);
    
    if (this.image) {
  // Append the image file to the FormData object
  formData.append('image', this.image, this.image.name);
}

    this.carlistService.Update(this.carId, formData).subscribe(
      (response)=>{
        console.log('Inventory Updated Successfully', response);
        alert('Car Updated Successfully');
        this.router.navigate(['/mycars']);
      }
    );
  }

  onFileChange(event: any) {
  if (event.target.files.length > 0) {
    this.image = event.target.files[0]; // Assign the selected File to image
  }
}

}