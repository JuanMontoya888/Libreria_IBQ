import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Proyecto_LibreriaIBQ';
}
