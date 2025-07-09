import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { user } from '../../../models/user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  usersFiltered: Array<user> = [];
  selectedUser: number = -1;
  formUser!: FormGroup;
  showFormUser: boolean = false;
  filterString!: string;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      id_account: ['', [Validators.required]],
      username: ['', [Validators.required]],
      passw: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      id: ['', [Validators.required]],
      is_admin: [false, [Validators.required]],
    });

    this.usersService.getAllUsers()
      .subscribe({
        next: (result) => {
          const { ok, users } = result;
          if (ok) {
            this.users = users;
            this.usersFiltered = this.users;
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  userSelected(index: number): void {
    this.showFormUser = true;
    this.selectedUser = index;

    this.formUser.patchValue({
      ...this.users[index],
      passw: '',
      is_admin: Boolean(this.users[index].is_admin)
    });
  }


}
