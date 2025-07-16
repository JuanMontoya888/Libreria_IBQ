import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '../../models/users';

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
  user!: user;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const userLS = localStorage.getItem('user');
    if (userLS != null) {
      this.user = JSON.parse(userLS)
      !this.user.is_admin ? this.router.navigate(['/user-view']) : () => { };

    } else this.router.navigate(['/login']);

  }


  logout(): void {
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  change(): void {
    this.router.navigate([`/admin/${this.buttonSelected.toLowerCase()}`]);
  }
}
