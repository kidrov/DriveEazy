import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css'],
})
export class ImageCardComponent implements OnInit {
  currentCard = 1; // Initialize with the first card

  ngOnInit() {
    // Start a timer to switch cards
    setInterval(() => {
      this.currentCard = (this.currentCard % 3) + 1; // Cycle through cards 1, 2, 3
    }, 4000); // Adjust the interval (in milliseconds) as needed
  }
}

