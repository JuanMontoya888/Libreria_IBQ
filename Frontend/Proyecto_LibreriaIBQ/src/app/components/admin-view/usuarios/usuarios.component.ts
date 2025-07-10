import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { user } from '../../../models/user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  users: Array<user> = [];
  filteredUsers: Array<user> = [];
  formUser!: FormGroup;
  showFormUser: boolean = false;
  isAddingNewUser: boolean = false;
  filterString!: string;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      id_account: [''],
      username: ['', [Validators.required]],
      passw: [''],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      id: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      is_admin: [false, [Validators.required]],
    });

    this.getUsersDB();
  }

  getUsersDB(): void {
    this.usersService.getAllUsers()
      .subscribe({
        next: ({ ok, users }) => {
          if (ok) {
            this.users = users;
            this.filteredUsers = this.users;
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  userSelected(index: number): void {
    this.showFormUser = true;
    this.isAddingNewUser = false;

    this.formUser.patchValue({
      ...this.filteredUsers[index],
      passw: '',
      is_admin: Boolean(this.filteredUsers[index].is_admin)
    });
  }

  emitFilterFN(): void {
    const query = this.filterString.toString().toLowerCase();

    this.filteredUsers = this.users
      .filter((user: user) => {
        if (!user) return false;

        return (Object.entries(user).some((us) => us?.toString().toLowerCase().includes(query)));
      });
  }

  addingNewUser(): void {
    this.showFormUser = true;

    this.isAddingNewUser = true;
    this.formUser.reset();
  }

  modifyValues(): void {
    const username = Boolean(this.formUser.get('is_admin')?.value) ?
      `${this.formUser.get('id')?.value}` : `al${this.formUser.get('id')?.value}`;

    this.formUser.patchValue({
      username: username,
      passw: `passw_${this.formUser.get('id')?.value}`
    });
  }

  deleteUser(): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará permanentemente al usuario.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(Number(this.formUser.get('id_account')?.value)).subscribe({
          next: ({ ok, message }) => {
            if (ok) {
              Swal.fire({
                icon: 'success',
                title: 'Usuario eliminado',
                text: 'El usuario fue eliminado correctamente.',
                timer: 2000,
                showConfirmButton: false,
              });

              this.formUser.reset();
              this.showFormUser = false;
              this.getUsersDB();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: message || 'No se pudo eliminar el usuario.',
              });
            }
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error del servidor',
              text: err?.message || 'Ocurrió un error inesperado al eliminar.',
            });
          }
        });
      } //if confirmation
    });

  }

  modifyUser(): void {
    if (this.formUser.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos requeridos.',
      });
      return;
    }

    const { id_account, ...user } = this.formUser.value;

    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Esta acción modificará permanentemente al usuario.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, modificar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.updateUser(id_account, user)
          .subscribe({
            next: ({ ok, message }) => {
              if (ok) {
                Swal.fire({
                  icon: 'success',
                  title: 'Usuario modificado',
                  text: 'El usuario fue modificado correctamente.',
                  timer: 2000,
                  showConfirmButton: false,
                });

                this.formUser.reset();
                this.showFormUser = false;
                this.getUsersDB();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al modificar',
                  text: message || 'No se pudo modificar el usuario.',
                });
              }
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error del servidor',
                text: err?.message || 'Ocurrió un error inesperado al modificar.',
              });
            }
          });
      }
    });
  }

  addNewUser(): void {
    if (this.formUser.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos requeridos.',
      });
      return;
    }

    //Omitiendo id_account
    const { id_account, ...us } = this.formUser.value;
    const user = {
      ...us,
      first_name: this.formUser.get('first_name')?.value
        .toString()
        .toLowerCase()
        .split(' ')
        .map((el: string) => el.charAt(0).toUpperCase() + el.slice(1))
        .join(' '),


      last_name: this.formUser.get('last_name')?.value.toString()
        .toLowerCase()
        .split(' ')
        .map((el: string) => el.charAt(0).toUpperCase() + el.slice(1))
        .join(' '),

    };

    this.usersService.addNewUser(user)
      .subscribe({
        next: (result) => {
          const { ok, message } = result;

          if (ok) {
            Swal.fire({
              icon: 'success',
              title: 'Usuario guardado',
              text: 'El usuario fue registrado correctamente.',
              timer: 2000,
              showConfirmButton: false
            });

            this.formUser.reset();
            this.showFormUser = false;

            this.getUsersDB();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar',
              text: message || 'No se pudo registrar el usuario.',
            });
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error del servidor',
            text: error?.message || 'Ocurrió un error inesperado.',
          });
        }
      });
  }


}
