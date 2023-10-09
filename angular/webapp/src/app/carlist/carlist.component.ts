import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Carlist } from './carlist.model';
import { CarlistService } from './carlist.service';
import { PaginationInstance } from 'ngx-pagination';
import { reservation } from '../models/reservation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent implements OnInit {
  uniqueCities: string[] = [];
  selectedCity: string = 'chennai';
  selectedLocation: string = 'Chennai';
  title = "carlist";
  carlist: Carlist[] = [];
  totalCars: number = 0;
  c: any[] = [];
  p: number = 1;
  filteredCarlist: Carlist[] = [];
  selectedCarCategory: string = '';
  selectedFuelType: string = '';
  selectedFuelTypes: string[] = [];
  selectedTransmissions: string[] = [];
  selectedCategory: string = '';
  public config: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 0,
  };

  constructor(private carlistService: CarlistService, private cdr: ChangeDetectorRef,private router: Router) {}

  ngOnInit(): void {
    const currentDate = new Date();
    this.carlistService.GetAll().subscribe(
      (result: Carlist[]) => {
        this.carlist = result;
        this.totalCars = this.carlist.length;

        for (let i = 0; i < this.totalCars; i++) {
          this.carlist[i].carImage = "data:image/jpeg;base64," + this.carlist[i].carImage;
        }

        // Filter cars available on the current date
        this.filterCarsByDate(currentDate);

        this.config.totalItems = this.carlist.length;
        this.uniqueCities = [...new Set(this.carlist.map((car) => car.city))];
        this.filteredCarlist = [...this.carlist];
        this.cdr.detectChanges();
      }
    );
  }

  filteredCarlistByDate: Carlist[] = [];
  allReservations: reservation[] = [];
  allReservedCars: any[] = [];
  removecarids: string[] = [];

  filterCarsByDate(selectedDate: Date) {
    const selectedDateTime = selectedDate.getTime();
    this.carlistService.get_all_reservations().subscribe((res: reservation[]) => {
      const reservedCarIds: string[] = [];

      res.forEach((rev) => {
        const revStartDateTime = new Date(rev.reservationStartDate).getTime();
        const revEndDateTime = new Date(rev.reservationEndDate).getTime();
        
        localStorage.setItem('start_input', revStartDateTime.toString());
        localStorage.setItem('end_input', revEndDateTime.toString());
        console.log("date should be changed");
  

        if (selectedDateTime >= revStartDateTime && selectedDateTime <= revEndDateTime) {
          reservedCarIds.push(rev.carId.toString());
        }
      });

      this.filteredCarlistByDate = this.carlist.filter((car) =>
        !reservedCarIds.includes(car.carId.toString())
      );

      this.filterCars(this.selectedCategory);
    });
  }

  locationstartformsubmit(locationstartform: any) {
    const startDateTime = new Date(locationstartform.controls.startinput.value).getTime();
    const endDateTime = new Date(locationstartform.controls.endinput.value).getTime();

    localStorage.setItem('start_input', locationstartform.controls.startinput.value);
    localStorage.setItem('end_input', locationstartform.controls.endinput.value);

    this.carlistService.get_all_reservations().subscribe((res: reservation[]) => {
      const reservedCarIds: string[] = [];

      res.forEach((rev) => {
        const revStartDateTime = new Date(rev.reservationStartDate).getTime();
        const revEndDateTime = new Date(rev.reservationEndDate).getTime();

        if (
          (startDateTime >= revStartDateTime && startDateTime <= revEndDateTime) ||
          (endDateTime >= revStartDateTime && endDateTime <= revEndDateTime) ||
          (startDateTime < revStartDateTime && endDateTime > revEndDateTime)
        ) {
          reservedCarIds.push(rev.carId.toString());

        }
      });

      this.filteredCarlistByDate = this.carlist.filter((car) =>
        !reservedCarIds.includes(car.carId.toString()) && car.city === this.selectedLocation
      );

      this.filterCars(this.selectedCategory);
    });
  }

  filterCars(category: string) {
    this.selectedCategory = category;
    let filteredCars = this.filteredCarlistByDate;

    if (category) {
      filteredCars = this.filteredCarlistByDate.filter((car) => car.carType === category);
    }

    if (this.selectedFuelTypes.length > 0) {
      filteredCars = filteredCars.filter((car) => this.selectedFuelTypes.includes(car.fuel));
    }

    if (this.selectedTransmissions.length > 0) {
      filteredCars = filteredCars.filter((car) =>
        this.selectedTransmissions.includes(car.transmission)
      );
    }

    this.filteredCarlist = filteredCars;
  }

  filterFuelType(fuelType: string, carCategory: string) {
    const index = this.selectedFuelTypes.indexOf(fuelType);

    if (index === -1) {
      this.selectedFuelTypes.push(fuelType);
    } else {
      this.selectedFuelTypes.splice(index, 1);
    }

    this.filterCars(carCategory);
  }

  filterTransmissions(transmission: string) {
    const index = this.selectedTransmissions.indexOf(transmission);

    if (index === -1) {
      this.selectedTransmissions.push(transmission);
    } else {
      this.selectedTransmissions.splice(index, 1);
    }

    this.filterCars(this.selectedCategory);
  }

  groupDataIntoPairs(data: Carlist[]): Carlist[][] {
    const pairs: Carlist[][] = [];
    let currentPair: Carlist[] = [];

    for (const car of data) {
      if (currentPair.length < 1) {
        currentPair.push(car);
      } else {
        pairs.push(currentPair);
        currentPair = [car];
      }
    }

    if (currentPair.length > 0) {
      pairs.push(currentPair);
    }

    return pairs;
  }

  generateStarRating(rating: string | undefined): string {
    const numericRating = rating ? parseFloat(rating) : 0;
    const maxRating = 5;
    const fullStars = Math.floor(numericRating);
    const halfStar = numericRating - fullStars >= 0.5;
    const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

    let starRating = '';

    for (let i = 0; i < fullStars; i++) {
      starRating += '<span class="star">&#9733;</span>';
    }

    if (halfStar) {
      starRating += '<span class="star">&#9734;</span>';
    }

    for (let i = 0; i < emptyStars; i++) {
      starRating += '<span class="star">&#9734;</span>';
    }

    return starRating;
  }

  clearFilters() {
    this.selectedFuelTypes = [];
    this.selectedTransmissions = [];
    this.filterCars(this.selectedCategory);
  }

  getCurrentCarCategory(): string {
    return this.selectedCategory !== '' ? this.selectedCategory : this.selectedCarCategory;
  }
  onCarSelect(car:any){console.log(car)
    this.router.navigateByUrl("/cardescription/"+car.carId);
  }
OpenDescription(carId: string) {
    this.router.navigate(['/cardescription', carId])
  }

}
