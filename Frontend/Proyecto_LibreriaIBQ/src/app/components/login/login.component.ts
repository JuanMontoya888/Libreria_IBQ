import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.login_form = this.formbuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    const users = [
      { username: 'al350176', password: 'juan1234**' },
      { username: '324882', password: 'juan1234**' }
    ];

    const us = users.filter((us: { username: string, password: string }) =>
      this.login_form.get('password')?.value === us.password && this.login_form.get('username')?.value === us.username);

    if (us.length < 1) {
      Swal.fire({
        icon: "error",
        title: "Credenciales invalidas...",
        text: "Ingrese las credenciales correctamente!",
      });
      return;
    }

    us[0].username.slice(0, 2) === 'al' ? this.router.navigate(['/user-view']) : this.router.navigate(['/admin/usuarios']);
  }
}
