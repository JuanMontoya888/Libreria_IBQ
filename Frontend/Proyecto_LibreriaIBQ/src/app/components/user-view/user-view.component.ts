import { Component } from '@angular/core';
import { NavbarUserComponent } from '../navbar-user/navbar-user.component';
import { DocumentsService } from '../../services/documents.service';
import { document_ } from '../../models/documents';
import { DatePipe } from '@angular/common';
import { user } from '../../models/users';

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
  documents: Array<document_> = [];
  documentsFiltered: Array<document_> = [];

  user!: user;

  constructor(
    private docsService: DocumentsService,
  ) { }


  ngOnInit(): void {
    this.docsService.getAllDocuments()
      .subscribe({
        next: (result) => {
          const { ok, documents } = result;
          this.documents = ok ? documents : [];

          this.documentsFiltered = this.documents;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  filterDocuments(filters: { filter: string, selectedCategory: string }): void {
    const { filter, selectedCategory } = filters;
    const query = filter.toString().toLowerCase() || '';

    // Primer filtro que escanea campo por campo
    this.documentsFiltered = this.documents
      .filter((doc: document_) => {
        if (!doc) return false;

        return (Object.entries(doc).some((dc) => dc?.toString().toLowerCase().includes(query)));
      });

    // Second filter, only scan category
    this.documentsFiltered = this.documentsFiltered
      .filter((doc: document_) => { // If it returns true, will return document_
        if (!doc) return false;
        if (!selectedCategory) return true;

        return doc.file_category === selectedCategory;
      });

  }

  downloadDocument(index: number): void {
    const { id_document } = this.documentsFiltered[index];

    this.docsService.getDocumentByID(id_document)
      .subscribe({
        next: (blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.documentsFiltered[index].file_name;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url); // liberar memoria
        },
        error: (err) => {
          console.error('Error al descargar documento:', err);
        }

      });
  }

}
