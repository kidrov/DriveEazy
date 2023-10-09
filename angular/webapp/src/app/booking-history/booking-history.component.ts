import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { HttpClient } from '@angular/common/http';
import { Reservation } from './model/Reservation';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { AddreviewComponent } from '../addreview/addreview.component';
import { review } from '../addreview/model/review';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  pastReservations: any[] | undefined;
  past: any[] = [];
  upcomingReservations: Reservation[] = [];
  rentedByEmailid: string = '';
  car: any = { "carId": '', "carImage": '', "carName": "", "fuel": '', "pricePerHour": '', "reservationStartDate": '', "reservationEndDate": '' }
  upcoming: any[] = [];
  allCars: any[] = []
  constructor(private bookingService: BookingService, private http: HttpClient, private dm: DomSanitizer, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadReservations();
  }
  loadReservations(): void {
    this.bookingService.GetAlLCars()
      .subscribe(
        (alls: any) => {
          this.allCars = alls;
          for (let i = 0; i < alls.length; i++) {
            if (this.allCars[i].carImage) {
              const image = this.arrayBufferToBase64(this.allCars[i].carImage);
              this.allCars[i].carImage = "data:image/jpeg;base64," + this.allCars[i].carImage;
            }
          }
          console.log(this.allCars);
          this.fetchUpcomingAndPastReservations(); // Call fetchUpcomingAndPastReservations after loading allCars
        }
      );
  }

  fetchUpcomingAndPastReservations(): void {
    this.bookingService.GetPastReservationsForUser(this.rentedByEmailid)
      .subscribe(
        reservations => {
          this.pastReservations = reservations;
          for (const pastReservation of this.pastReservations) {
            const carIndex = this.allCars.findIndex(car => car.carId === pastReservation.carId);
            if (carIndex !== -1) {
              const car = this.allCars[carIndex];
              const pastItem = {
                carId: car.carId,
                reservationStartDate: pastReservation.reservationStartDate,
                reservationEndDate: pastReservation.reservationEndDate,
                carImage: car.carImage,
                fuel: car.fuel,
                carName: car.carName + ", " + car.carBrand,
                pricePerHour: car.pricePerHour
              };
              this.past.push(pastItem);
            }
          }
          console.log(this.past);
        },
        error => {
          console.error('Error loading past reservations:', error);
        }
      );

    this.bookingService.GetAllUpcomingReservationsForUser(this.rentedByEmailid)
      .subscribe(
        reservations => {
          this.upcomingReservations = reservations;
          for (const upcomingReservation of this.upcomingReservations) {
            const carIndex = this.allCars.findIndex(car => car.carId === upcomingReservation.carId);
            if (carIndex !== -1) {
              const car = this.allCars[carIndex];
              const upcomingItem = {
                carId: car.carId,
                reservationStartDate: upcomingReservation.reservationStartDate,
                reservationEndDate: upcomingReservation.reservationEndDate,
                carImage: car.carImage,
                fuel: car.fuel,
                carName: car.carName + ", " + car.carBrand,
                pricePerHour: car.pricePerHour
              };
              this.upcoming.push(upcomingItem);
            }
          }
          console.log(this.upcoming);
        },
        error => {
          console.error('Error loading upcoming reservations:', error);
        }
      );

    for (let i = 0; i < this.upcoming.length; i++) {
      for (let j = 0; j < this.allCars.length; j++) {
        if (this.upcoming[i].carId == this.allCars[j].carId) {
          this.upcoming[i].carImage = this.allCars[j].carImage;
          this.upcoming[i].fuel = this.allCars[j].fuel;
          this.upcoming[i].carName = this.allCars[j].carName + ", " + this.allCars[j].carBrand;
          this.upcoming[i].pricePerHour = this.allCars[j].pricePerHour;
          break; // Exit the inner loop once a matching car is found
        }
      }
    }
    for (let i = 0; i < this.past.length; i++) {
      for (let j = 0; j < this.allCars.length; j++) {
        if (this.past[i].carId == this.allCars[j].carId) {
          this.past[i].carImage = this.allCars[j].carImage;
          this.past[i].fuel = this.allCars[j].fuel;
          this.past[i].carName = this.allCars[j].CarName + "," + this.allCars[j].carBrand;
          this.upcoming[i].pricePerHour = this.allCars[j].pricePerHour;
          break; // Exit the inner loop once a matching car is found
        }
      }
    }
  }
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  openReviewDialog(reservation: any) {
    const dialogRef = this.dialog.open(AddreviewComponent, {
      width: '400px', // Adjust the width as needed
      data: {
        CarId: reservation.carId,
        pastReservations: this.pastReservations
      } // Pass the reservation data to the dialog component
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the dialog close event if needed
    });
  }
}

