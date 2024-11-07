import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReviewsService} from '../../services/reviews.service';
import {CreateReview} from '../../models/create-review.entity';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
    CommonModule
  ],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.css'
})
export class CreateReviewComponent {
  @Input() gameId!: number;
  @Output() reviewCreated = new EventEmitter<void>();
  description = '';
  score = 0;

  constructor(private reviewService: ReviewsService) {}

  submitReview(): void {
    const newReview: CreateReview = {
      description: this.description,
      score: this.score,
      gameId: this.gameId,
      token: 'Bearer ' + localStorage.getItem('token') || ''
    };

    this.reviewService.createReview(newReview).subscribe(
      () => {
        this.description = '';
        this.score = 0;
        this.reviewCreated.emit();
      },
      (error) => console.error('Error creating review', error)
    );
  }
}
