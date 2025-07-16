import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentsService } from '../../services/documents.service';
import { category } from '../../models/categories';
import { user } from '../../models/users';

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
  user!: user;

  opciones: Array<category> = [];
  @Output() emitFilter = new EventEmitter<{ filter: string, selectedCategory: string }>();

  constructor(
    private router: Router,
    private docsService: DocumentsService
  ) { }

  ngOnInit(): void {
    this.docsService.getAllCategories()
      .subscribe({
        next: (result) => {
          const { ok, categories } = result;

          if (ok) {
            this.opciones = categories.map((cat: any) => cat.category_name);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });

    const userLS = localStorage.getItem('user');
    if (userLS != null) {
      this.user = JSON.parse(userLS)
      this.user.is_admin ? this.router.navigate(['/admin/usuarios']) : () => { };

    } else this.router.navigate(['/login']);

  }

  emitFilterFN(): void {
    const filters = { filter: this.filterString, selectedCategory: this.selectedCategory };
    this.emitFilter.emit(filters);
  }

  logout(): void {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
