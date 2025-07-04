import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  imports: [
    FormsModule,
    RouterOutlet
  ],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {


  constructor(
    private router: Router
  ) { }


  logout(): void {
    this.router.navigate(['/login']);
  }
}
