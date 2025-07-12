import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { document } from '../../../models/document';
import { DocumentsService } from '../../../services/documents.service';
import { user } from '../../../models/user';
import { Router } from '@angular/router';

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
  categories: Array<any> = [];
  user!: user;
  formDocument!: FormGroup;
  showFormDocument: boolean = false;
  isAddingNewDocument: boolean = false;
  filterString!: string;

  constructor(
    private docsService: DocumentsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formDocument = this.formBuilder.group({
      username: ['', Validators.required],
      user_id: ['', Validators.required],
      file_category: [''],
      id_category: [''],
      file_name: ['', Validators.required],
      file_path: ['', Validators.required],
      file_type: ['', Validators.required],
    });


    this.docsService.getAllCategories()
      .subscribe({
        next: ({ ok, categories }) => {
          if (ok) this.categories = categories;
        }
      });

    this.getDocumentsDB();


    const userLS = localStorage.getItem('user');
    if (userLS != null) this.user = JSON.parse(userLS);

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
    this.formDocument.patchValue({
      username: this.user.username,
      user_id: this.user.id
    });
  }


  deleteDocument(): void {

  }

  modifyDocument(): void {

  }

  addNewDocument(): void {

  }

  uploadFile(event: Event | DragEvent): void {
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
