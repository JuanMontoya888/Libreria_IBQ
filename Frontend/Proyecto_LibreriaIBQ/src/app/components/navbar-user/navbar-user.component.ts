import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-user',
  imports: [
    FormsModule,
  ],
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.css'
})
export class NavbarUserComponent {
  filterString: string = '';
  selectedCategory: string = '';

  opciones = ['Libro', 'Artículo', 'Informe', 'Manual Técnico', 'Tesis'];
  @Output() emitFilter = new EventEmitter<{ filter: string, selectedCategory: string }>();

  constructor(
    private router: Router
  ) { }

  emitFilterFN(): void {
    const filters = { filter: this.filterString, selectedCategory: this.selectedCategory };
    this.emitFilter.emit(filters);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
