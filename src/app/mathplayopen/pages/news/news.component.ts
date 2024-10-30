import {Component, OnInit} from '@angular/core';
import {CardNewsComponent} from '../../components/card-news/card-news.component';
import {NewsService} from '../../services/news.service';
import {HttpClientModule} from '@angular/common/http';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CardNewsComponent,
    HttpClientModule,
    NgForOf
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  news: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe(data => {
      this.news = data;
      console.log(this.news);
    });
  }
}
