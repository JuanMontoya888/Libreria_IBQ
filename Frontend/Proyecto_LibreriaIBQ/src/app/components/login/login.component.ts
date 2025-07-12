import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login_form!: FormGroup;
  look_pass: boolean = true;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.login_form = this.formbuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    const credentials = {};
    this.usersService.login(this.login_form.get('username')?.value, this.login_form.get('password')?.value)
      .subscribe({
        next: (result) => {
          const { ok, message } = result;

          if (!ok) {
            Swal.fire({
              icon: "error",
              title: "Credenciales invalidas...",
              text: "Ingrese las credenciales correctamente!",
            });

            return;
          }
          const { user } = result;

          localStorage.setItem('user', JSON.stringify(user));
          user.is_admin ? this.router.navigate(['/admin/usuarios']) : this.router.navigate(['/user-view']);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}
