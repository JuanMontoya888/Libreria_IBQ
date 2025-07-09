import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { document } from '../../../models/document';
import { DocumentsService } from '../../../services/documents.service';

@Component({
  selector: 'app-documentos',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './documentos.component.html',
  styleUrl: './documentos.component.css'
})
export class DocumentosComponent {
  documents: Array<document> = [];
  filteredDocuments: Array<document> = [];
  formDocument!: FormGroup;
  showFormDocument: boolean = false;
  isAddingNewDocument: boolean = false;
  filterString!: string;

  constructor(
    private docsService: DocumentsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formDocument = this.formBuilder.group({});

    this.getDocumentsDB();
  }

  getDocumentsDB(): void {
    this.docsService.getAllDocuments()
      .subscribe({
        next: ({ ok, documents, message }) => {
          if (ok) {
            this.documents = documents;
            this.filteredDocuments = this.documents;
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  docSelected(index: number): void {
    this.showFormDocument = true;
    this.isAddingNewDocument = false;

    this.formDocument.patchValue({
      ...this.filteredDocuments[index]
    });
  }

  emitFilterFN(): void {
    const query = this.filterString.toString().toLowerCase();

    this.filteredDocuments = this.documents
      .filter((document) => {
        if (!document) return false;

        return (Object.entries(document).some((doc) => doc?.toString().toLowerCase().includes(query)));
      });
  }

  addingNewDoc(): void {
    this.showFormDocument = true;

    this.isAddingNewDocument = true;
    this.formDocument.reset();
  }


  deleteDocument(): void {

  }

  modifyDocument(): void {

  }

  addNewDocument(): void {

  }
}
