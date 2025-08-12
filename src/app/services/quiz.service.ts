import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export type QuizCategory = string;
export interface QuizQuestion {
  id: number;
  category: QuizCategory;
  question: string;
  options: string[];
  answerIndex: number;
}
export interface QuizData {
  categories: QuizCategory[];
  questions: QuizQuestion[];
}

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor(private http: HttpClient) {}

  load(): Observable<QuizData> {
    return this.http.get<QuizData>('quiz.json');
  }

  loadByCategory(category: QuizCategory | 'All'): Observable<QuizQuestion[]> {
    return this.load().pipe(
      map(d => category === 'All' ? d.questions : d.questions.filter(q => q.category === category))
    );
  }
}


