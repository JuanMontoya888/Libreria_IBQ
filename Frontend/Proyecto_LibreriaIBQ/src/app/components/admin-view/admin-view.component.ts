import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { RouterOutlet } from '@angular/router';

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

  constructor() { }


}
