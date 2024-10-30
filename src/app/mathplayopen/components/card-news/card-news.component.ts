import {Component, Input} from '@angular/core';
import {NewsService} from '../../services/news.service';

@Component({
  selector: 'app-card-news',
  standalone: true,
  imports: [],
  templateUrl: './card-news.component.html',
  styleUrl: './card-news.component.css'
})
export class CardNewsComponent {

  @Input() article: any;

}
