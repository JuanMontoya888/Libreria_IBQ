import { Component } from '@angular/core';
import { NavbarUserComponent } from '../navbar-user/navbar-user.component';
import { DocumentsService } from '../../services/documents.service';
import { document } from '../../models/document';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-view',
  imports: [
    NavbarUserComponent,
    DatePipe
  ],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  documents!: Array<document>;

  constructor (
    private docs_service: DocumentsService
  ) {}


  ngOnInit(): void {
    this.documents = this.docs_service.getDocuments();
  }

}
