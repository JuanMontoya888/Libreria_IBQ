import { Component, input } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { user } from '../../../models/users';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { LoaderService } from '../../../services/loader.service';

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

  deleteUser(index?: number): void {
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
        // This is if user delete user since users's list
        const id_account = index != null ? this.filteredUsers[index].id_account : this.formUser.get('id_account')?.value;
        this.usersService.deleteUser(Number(id_account)).subscribe({
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
                text: 'No se pudo eliminar el usuario.',
              });
            }
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error del servidor',
              text: 'Ocurrió un error inesperado al eliminar.',
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
                  text: 'No se pudo modificar el usuario.',
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
              text: 'No se pudo registrar el usuario.',
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

  uploadFile(event: Event | DragEvent): void {
    let files: FileList | null = null;

    //manejar evento de (change) o evento de (drop)
    if (event instanceof Event && (event.target as HTMLInputElement).files) {
      files = (event.target as HTMLInputElement).files;
    } else if (event instanceof DragEvent && event.dataTransfer?.files) {
      files = event.dataTransfer.files;
    }


    if (files && files.length > 0) {
      const formData = new FormData();

      Array.from(files).forEach((file: File) => {
        if (file.name.endsWith('.xlsx')) {
          formData.append('files', file, file.name);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al subir documento',
            text: 'Solo se permiten documentos excel y csv.',
          });
        }
      });

      Swal.fire({
        title: '¿Deseas añadir los usuarios?',
        showCancelButton: true,
        confirmButtonText: 'Sí, añadir',
      }).then((result) => {
        if (result.isConfirmed) {
          LoaderService.mostrar('Añadiendo usuarios...');
          this.usersService.addNewUsers(formData).subscribe({
            next: ({ ok, mappedData, numUsers }) => {
              const resumen = {
                exitosos: 0,
                yaExistentes: 0,
                errores: 0
              };

              // Clasificamos los resultados
              mappedData.forEach((resp: any) => {
                if (resp.success) {
                  resumen.exitosos++;
                } else if (resp.message === 'user-exists') {
                  resumen.yaExistentes++;
                } else {
                  resumen.errores++;
                }
              });

              const totalFallidos = mappedData.length;
              const totalExitosos = numUsers - totalFallidos;

              const mensaje = `
                                <div style="text-align: left; font-size: 25px; line-height: 1.6;">
                                  <ul style="padding-left: 3em; margin: 0;">
                                    <li><strong>${resumen.exitosos}</strong> usuario(s) añadido(s) exitosamente.</li>
                                    <li><strong>${resumen.yaExistentes}</strong> ya existían.</li>
                                    <li><strong>${resumen.errores}</strong> con error del servidor.</li>
                                  </ul>
                                </div>
                              `;

              Swal.fire({
                title: 'Resultado de la carga',
                html: mensaje,
                icon: resumen.errores > 0 ? 'warning' : 'success',
                confirmButtonText: 'Aceptar',
              });
            }
            ,
            error: (error) => {
              console.error('Error del servidor:', error);
              LoaderService.cerrar();

              Swal.fire({
                icon: 'error',
                title: 'Error del servidor',
                text: 'Ocurrió un error inesperado.',
              });
            },
            complete: () => {
              this.getUsersDB();
            }
          });
        }
      });

    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

}
