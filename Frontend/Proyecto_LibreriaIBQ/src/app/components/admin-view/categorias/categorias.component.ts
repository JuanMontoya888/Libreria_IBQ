import { Component } from '@angular/core';
import { category } from '../../../models/categories';
import { DocumentsService } from '../../../services/documents.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { user } from '../../../models/users';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categorias',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  categories: Array<category> = [];
  filteredCategories: Array<category> = [];
  selectedCategory: category | null = null;
  formCategory!: FormGroup;
  showFormCat: boolean = false;
  isAddingNewCat: boolean = false;
  filterString!: string;
  user!: user;

  constructor(
    private docsService: DocumentsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formCategory = this.formBuilder.group({
      id_category: [''],
      user_id: ['', Validators.required],
      username: ['', Validators.required],
      category_name: ['', Validators.required],
      created_at: [''],
    });

    this.getCategoriesDB();

    const userLS = localStorage.getItem('user');
    if (userLS != null) this.user = JSON.parse(userLS);
  }

  getCategoriesDB(): void {
    this.docsService.getAllCategories()
      .subscribe({
        next: ({ ok, categories }) => {
          if (ok) {
            this.categories = categories;
            this.filteredCategories = this.categories;
          }
        }
      });
  }

  categorySelected(index: number): void {
    this.showFormCat = true;
    this.isAddingNewCat = false;

    this.formCategory.patchValue({
      ...this.categories[index]
    });
  }

  emitFilterFN(): void {
    const query = this.filterString.toString().toLowerCase();

    this.filteredCategories = this.categories
      .filter((category: category) => {
        if (!category) return false;

        return (Object.entries(category).some((cat) => cat?.toString().toLowerCase().includes(query)));
      });
  }

  addingNewCategory(): void {
    this.showFormCat = true;
    this.isAddingNewCat = true;
    this.formCategory.reset();

    this.formCategory.patchValue({
      user_id: this.user.id,
      username: this.user.username
    });
  }

  deleteCategory(index?: number): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará permanentemente la categoría.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const id_category = index != null ? this.filteredCategories[index].id_category : this.formCategory.get('id_category')?.value;
        this.docsService.deleteCategoryByID(id_category)
          .subscribe({
            next: ({ ok, message }) => {
              if (ok) {
                Swal.fire({
                  icon: 'success',
                  title: 'Categoría eliminado',
                  text: 'La categoría fue eliminada correctamente.',
                  timer: 2000,
                  showConfirmButton: false,
                });

                this.formCategory.reset();
                this.showFormCat = false;
                this.getCategoriesDB();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al eliminar',
                  text: 'No se pudo eliminar la categoría.',
                });
              }
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error del servidor',
                text: 'Ocurrió un error inesperado al eliminar.',
              });
            } //if confirmation
          }); //subscribe
      }
    });
  }

  modifyCategory(): void {
    if (this.formCategory.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos requeridos.',
      });
      return;
    }

    const { id_category, ...category } = this.formCategory?.value;

    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Esta acción modificará permanentemente la categoría.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, modificar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.docsService.updateCategory(id_category, category)
          .subscribe({
            next: ({ ok, message }) => {
              if (ok) {
                Swal.fire({
                  icon: 'success',
                  title: 'Categoría modificada',
                  text: 'La categoría fue modificada correctamente.',
                  timer: 2000,
                  showConfirmButton: false,
                });

                this.formCategory.reset();
                this.showFormCat = false;
                this.getCategoriesDB();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al modificar',
                  text: 'No se pudo modificar la categoría.',
                });
              }
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error del servidor',
                text: 'Ocurrió un error inesperado al modificar.',
              });
            }
          });
      }
    });
  }

  addNewCategory(): void {
    if (this.formCategory.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos requeridos.',
      });
      return;
    }

    this.formCategory.patchValue({
      created_at: new Date()
    });

    const { id_category, ...cat } = this.formCategory?.value;

    this.docsService.addNewCategory(cat)
      .subscribe({
        next: ({ ok, message }) => {

          if (ok) {
            Swal.fire({
              icon: 'success',
              title: 'Categoría guardada',
              text: 'La categoría fue registrada correctamente.',
              timer: 2000,
              showConfirmButton: false
            });

            this.formCategory.reset();
            this.showFormCat = false;
            this.getCategoriesDB();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar',
              text: 'No se pudo registrar la categoría.'
            });
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error del servidor',
            text: 'Ocurrió un error inesperado.',
          });
        }
      });
  }

}

