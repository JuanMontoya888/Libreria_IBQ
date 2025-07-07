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
  documentsFiltered!: Array<document>;

  constructor(
    private docsService: DocumentsService,
  ) { }


  ngOnInit(): void {
    this.docsService.getDocuments()
      .subscribe({
        next: (result) => {
          const { ok, documents } = result;

          this.documents = ok ? documents : this.docsService.getDocuments2();
          console.log(this.documents, ok);
        },
        error: (err) => {
          console.log(err);
        }
      });

    this.documentsFiltered = this.documents;
  }

  filterDocuments(filters: { filter: string, selectedCategory: string }): void {
    const { filter, selectedCategory } = filters;
    const query = filter.toString().toLowerCase() || '';

    // Primer filtro que escanea campo por campo
    this.documentsFiltered = this.documents
      .filter((doc: document) => {
        if (!doc) return false;

        return (Object.entries(doc).some((dc) => dc?.toString().toLowerCase().includes(query)));
      });

    // Second filter, only scan category
    this.documentsFiltered = this.documentsFiltered
      .filter((doc: document) => { // If it returns true, will return document
        if (!doc) return false;
        if (!selectedCategory) return true;

        return doc.file_category === selectedCategory;
      });

  }

}
