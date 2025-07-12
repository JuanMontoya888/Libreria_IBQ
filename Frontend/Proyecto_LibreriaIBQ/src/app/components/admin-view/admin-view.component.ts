import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { Router, RouterOutlet } from '@angular/router';
import { user } from '../../models/user';

@Component({
  selector: 'app-admin-view',
  imports: [
    NavbarAdminComponent,
    RouterOutlet
  ],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})
export class AdminViewComponent {
  user!: user;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const userLS = localStorage.getItem('user');
    if (userLS != null) this.user = JSON.parse(userLS);
    else this.router.navigate(['/login']);

  }

}
