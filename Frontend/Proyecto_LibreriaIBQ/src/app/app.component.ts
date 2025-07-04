import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignalsService } from './services/signals.service';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Proyecto_LibreriaIBQ';

  constructor(
    private signals: SignalsService
  ) { }

  ngOnInit(): void {
    this.signals.darkModeObservable()
      .subscribe((value: 'dark' | 'light') => {
        // Enviamos el tema a la raiz
        document.documentElement.setAttribute('data-theme', value);

        // Modificamos todas las clases
        document.body.classList.toggle('dark-mode', value === 'dark');
        document.body.classList.toggle('light-mode', value === 'light');
      });
  }

}
