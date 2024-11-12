import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Ranking} from '../models/ranking.entity';
import {map, Observable, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private studentsUrl = `${environment.serverBasePath}/students/all`;
  private scoresUrl = `${environment.serverBasePath}/scores/all`;

  constructor(private http: HttpClient) {}

  getRanking(): Observable<Ranking[]> {
    return this.http.get<any[]>(this.studentsUrl).pipe(
      switchMap(students => {
        return this.http.get<any[]>(this.scoresUrl).pipe(
          map(scores => {
            return students.map(student => {
              const scoreEntry = scores.find(score => score.studentId === student.studentId);
              return {
                studentId: student.studentId,
                fullName: `${student.firstName} ${student.lastName}`,
                score: scoreEntry ? scoreEntry.score : 0
              };
            })
          })
        )
      })
    );
  }
}
