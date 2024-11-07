import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../models/review.entity';
import {ReviewsService} from '../../services/reviews.service';
import {CommonModule, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CommonModule
  ],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent implements OnInit{
  @Input() gameId!: number;
  reviews: Review[] = [];

  constructor(private reviewService: ReviewsService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviewsByGameId(this.gameId).subscribe(
      (data) => this.reviews = data,
      (error) => console.error('Error fetching reviews', error)
    );
  }

  onReviewCreated(): void {
    this.loadReviews();
  }
}
