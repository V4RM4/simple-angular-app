import { Component, signal, computed, inject } from '@angular/core';
import { NgIf, NgFor, NgClass, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { QuizService, QuizQuestion } from '../../services/quiz.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, NgClass],
  template: `
    <div class="space-y-6">
      <h1 class="text-2xl font-semibold tracking-tight">Quiz</h1>

      <div class="flex flex-wrap gap-2">
        <button
          *ngFor="let c of categories()"
          (click)="selectCategory(c)"
          class="rounded border px-3 py-1 text-sm hover:bg-gray-50"
          [ngClass]="{ 'bg-blue-600 text-white border-blue-600': c === selectedCategory(), 'border-gray-300': c !== selectedCategory() }"
        >{{ c }}</button>
      </div>

      <div class="space-y-4" *ngIf="currentQuestion() as q">
        <div class="text-sm text-gray-600">Question {{ index() + 1 }} of {{ total() }}</div>
        <h2 class="text-lg font-medium">{{ q.question }}</h2>
        <div class="grid gap-2">
          <button
            *ngFor="let option of q.options; let i = index"
            (click)="answer(i)"
            class="rounded border px-3 py-2 text-left hover:bg-gray-50"
            [ngClass]="buttonClass(q, i)"
            [disabled]="answered()"
          >{{ option }}</button>
        </div>

        <div class="flex items-center gap-3 pt-2">
          <button (click)="prev()" class="rounded border px-3 py-1 text-sm hover:bg-gray-50" [disabled]="index() === 0">Prev</button>
          <button (click)="next()" class="rounded border px-3 py-1 text-sm hover:bg-gray-50" [disabled]="index() >= total() - 1">Next</button>
          <button (click)="reset()" class="ml-auto rounded px-3 py-1 text-sm text-blue-700 hover:bg-blue-50">Reset</button>
        </div>
      </div>

      <div *ngIf="index() >= total()" class="space-y-2">
        <h2 class="text-lg font-medium">Results</h2>
        <p>Score: <span class="font-semibold">{{ score() }}</span> / {{ total() }}</p>
        <button (click)="restart()" class="rounded bg-blue-600 px-4 py-2 text-white">Take again</button>
      </div>
    </div>
  `
})
export class FormComponent {
  categories = signal<(string)[]>(['All']);
  selectedCategory = signal<'All' | string>('All');
  questions = signal<QuizQuestion[]>([]);
  index = signal(0);
  selectedOption = signal<number | null>(null);
  answered = signal(false);
  score = signal(0);

  total = computed(() => this.questions().length);
  currentQuestion = computed(() => this.questions()[this.index()] ?? null);

  private platformId = inject(PLATFORM_ID);

  constructor(private fb: FormBuilder, private quiz: QuizService) {
    if (isPlatformBrowser(this.platformId)) {
      this.load();
    }
  }

  load() {
    this.quiz.load().subscribe(d => {
      this.categories.set(['All', ...d.categories]);
      this.questions.set(d.questions);
      this.index.set(0);
      this.resetState();
    });
  }

  selectCategory(c: string) {
    this.selectedCategory.set(c);
    this.quiz.loadByCategory(c as any).subscribe(qs => {
      this.questions.set(qs);
      this.index.set(0);
      this.score.set(0);
      this.resetState();
    });
  }

  answer(i: number) {
    if (this.answered()) return;
    this.selectedOption.set(i);
    this.answered.set(true);
    const q = this.currentQuestion();
    if (q && i === q.answerIndex) this.score.set(this.score() + 1);
  }

  buttonClass(q: QuizQuestion, optionIndex: number) {
    if (!this.answered()) return { 'border-gray-300': true };
    const isCorrect = optionIndex === q.answerIndex;
    const isChosen = optionIndex === this.selectedOption();
    return {
      'border-green-500 bg-green-50': isCorrect,
      'border-red-500 bg-red-50': !isCorrect && isChosen,
      'border-gray-300 opacity-70': !isCorrect && !isChosen
    };
  }

  next() {
    if (this.index() < this.total() - 1) {
      this.index.set(this.index() + 1);
      this.resetState();
    } else {
      this.index.set(this.total());
    }
  }

  prev() {
    if (this.index() > 0) {
      this.index.set(this.index() - 1);
      this.resetState();
    }
  }

  reset() { this.resetState(); }

  restart() {
    this.index.set(0);
    this.score.set(0);
    this.resetState();
  }

  private resetState() {
    this.selectedOption.set(null);
    this.answered.set(false);
  }
}


