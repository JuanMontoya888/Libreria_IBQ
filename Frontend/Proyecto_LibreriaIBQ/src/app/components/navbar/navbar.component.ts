import { Component } from '@angular/core';
import { SignalsService } from '../../services/signals.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDarkMode: 'dark' | 'light' = 'dark';

  constructor(
    private signals: SignalsService
  ) { }

  ngOnInit(): void {
  }

  changeMode(): void {
    this.isDarkMode = this.isDarkMode === 'dark' ? 'light' : 'dark';
    this.signals.setDarkMode(this.isDarkMode);
  }

}
