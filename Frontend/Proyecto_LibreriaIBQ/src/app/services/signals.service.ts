import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {
  private $darkModeSubject = new BehaviorSubject<'dark' | 'light'>('dark');

  constructor() { }

  darkModeObservable(): BehaviorSubject<'dark' | 'light'> {
    return this.$darkModeSubject;
  }

  setDarkMode(next: ('dark' | 'light')): void {
    return this.$darkModeSubject.next(next);
  }

}
