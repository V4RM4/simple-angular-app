import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="space-y-2">
      <h1 class="text-2xl font-semibold tracking-tight">Home</h1>
      <p class="text-gray-600">Welcome.</p>
      <p class="text-sm text-gray-500">Developed by Vaisakh Suresh</p>
    </div>
  `
})
export class HomeComponent {}


