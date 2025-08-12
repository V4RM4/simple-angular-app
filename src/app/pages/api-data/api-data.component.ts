import { Component } from '@angular/core';
import { NgForOf, AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-api-data',
  standalone: true,
  imports: [NgForOf, AsyncPipe],
  template: `
    <div class="space-y-4">
      <h1 class="text-2xl font-semibold tracking-tight">API Data</h1>
      <ul class="space-y-2">
        <li *ngFor="let fact of facts$ | async" class="rounded border p-3 hover:bg-gray-50">{{ fact }}</li>
      </ul>
    </div>
  `
})
export class ApiDataComponent {
  facts$: Observable<string[]>;
  constructor(private api: ApiService) {
    this.facts$ = this.api.getFacts().pipe(map(r => r.data.map(i => i.fact)));
  }
}


