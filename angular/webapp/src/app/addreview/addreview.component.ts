import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Review } from 'src/Model/Review';
import { Reservation } from '../booking-history/model/Reservation';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css']
})
export class AddreviewComponent {
  Rating: string | undefined;
  Comment: String | undefined;
  CarId: string;

  constructor(
    public dialogRef: MatDialogRef<AddreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.CarId = data.CarId;
    console.log(data);
  }

  submitReview() {
    console.log('Rating:', this.Rating);
    console.log('Comment:', this.Comment);
    if (!this.Rating || !this.Comment) {
      alert('Please provide both a rating and a description.');
      return;
    }

    const Rating = this.Rating ? String(Number(this.Rating)) : '';
    const Comment = this.Comment;

    const review = {
      Rating: Rating,
      Comment: Comment,
      CarId: this.CarId
    };
    console.log(review);

    // Check if CarId matches any past reservation
    const isMatchingCar = this.data.pastReservations.some((Reservation: { carId: string; }) => Reservation.carId === this.CarId);

    if (isMatchingCar) {
      this.http.post('https://localhost:7042/api/Review', review)
        .subscribe(
          response => {
            console.log('Review submitted successfully:', response);
            // Close the dialog
            this.dialogRef.close();
          },
          error => {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again later.');
          }
        );
    } else {
      alert('Invalid CarId. Cannot submit review for this car.');
    }
  }
}
