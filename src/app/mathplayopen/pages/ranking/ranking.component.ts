import {Component, OnInit} from '@angular/core';
import {Ranking} from '../../models/ranking.entity';
import {RankingService} from '../../services/ranking.service';
import {CommonModule, NgForOf} from '@angular/common';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit{
  rankings: Ranking[] = [];

  constructor(private rankingService: RankingService) {}

  ngOnInit(): void {
    this.loadRanking();
  }

  loadRanking(): void {
    this.rankingService.getRanking().subscribe(
      (data: Ranking[]) => {
        this.rankings = data.sort((a, b) => b.score - a.score);
      },
      (error) => console.error('Error fetching ranking', error)
    );
  }
}
