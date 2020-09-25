import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vote } from 'src/app/home/tabs/dinners/dinner-votes/dinner-votes.page';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {

  @Input() categoryId: number;
  @Input() categoryName: string;
  @Input() groupId: number;
  @Output() ratingChange: EventEmitter<Vote> = new EventEmitter();
  rating: number;

  constructor() { }

  ngOnInit() { }

  rate(index: number) {
    this.rating = index;
    this.ratingChange.emit({ groupId: this.groupId, categoryId: this.categoryId, rating: this.rating });
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }

  getColor(index: number) {
    const grey = '#575757';
    const green = '#9CC7AE';
    const yellow = '#FFC107';
    const red = '#F44336';

    if (this.isAboveRating(index)) {
      return grey;
    }
    switch (this.rating) {
      case 1:
      case 2:
        return red;
      case 3:
        return yellow;
      case 4:
      case 5:
        return green;
      default:
        return grey;

    }
  }

}
