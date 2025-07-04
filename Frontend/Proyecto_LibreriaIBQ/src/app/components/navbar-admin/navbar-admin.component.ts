import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  imports: [
    FormsModule
  ],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
  buttonSelected: 'Usuarios' | 'Documentos' | 'Categorias' = 'Usuarios';

  constructor(
    private router: Router
  ) { }

  logout(): void {
    this.router.navigate(['/login']);
  }

  change(): void {
    this.router.navigate([`/admin/${this.buttonSelected.toLowerCase()}`])
  }
}
