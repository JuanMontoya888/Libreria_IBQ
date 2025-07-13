import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { document } from '../../../models/document';
import { DocumentsService } from '../../../services/documents.service';
import { user } from '../../../models/user';
import Swal from 'sweetalert2';
import { LoaderService } from '../../../services/loader.service';
import { catchError, forkJoin, of } from 'rxjs';
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

  documentsUploaded!: FileList | null;
  docs: document[] = [];

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
      uploaded_at: ['', Validators.required]
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

    console.log(this.formDocument.value)
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


  deleteDocument(index: number): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará permanentemente el documento.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.docsService.deleteDocumentByID(index)
          .subscribe({
            next: ({ ok, message }) => {
              if (ok) {
                Swal.fire({
                  icon: 'success',
                  title: 'Documento eliminado',
                  text: 'El documento fue eliminado correctamente.',
                  timer: 2000,
                  showConfirmButton: false,
                });

                this.formDocument.reset();
                this.showFormDocument = false;
                this.getDocumentsDB();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al eliminar',
                  text: 'No se pudo eliminar el usuario.',
                });
              }
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error del servidor',
                text: err?.message || 'Ocurrió un error inesperado al eliminar.',
              });
            }
          });
      }
    });
  }

  modifyDocument(): void {
    if (this.formDocument.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos requeridos.',
      });
      return;
    }

  }

  addNewDocument(): void {
    if (this.formDocument.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos requeridos.',
      });
      return;
    }

    const { id_document, ...doc } = this.formDocument.value;

    this.docsService.addNewDocument(doc)
      .subscribe({
        next: ({ ok, message }) => {

          if (ok) {
            Swal.fire({
              icon: 'success',
              title: 'Documento guardado',
              text: 'El documento fue registrado correctamente.',
              timer: 2000,
              showConfirmButton: false
            });

            this.formDocument.reset();
            this.showFormDocument = false;
            this.getDocumentsDB();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar',
              text: 'No se pudo registrar el documento.'
            });
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error del servidor',
            text: 'Ocurrió un error inesperado.',
          });
        }
      });
  }

  uploadFile(event: Event | DragEvent): void {

    // Manejar evento de (change) o evento de (drop)
    if (event instanceof Event && (event.target as HTMLInputElement).files) {
      this.documentsUploaded = (event.target as HTMLInputElement).files!;
    } else if (event instanceof DragEvent && event.dataTransfer?.files) {
      this.documentsUploaded = event.dataTransfer.files!;
    }

    if (this.documentsUploaded && this.documentsUploaded.length > 0) {

      Array.from(this.documentsUploaded).forEach((file: File, index) => {
        const timestamp = Date.now();
        const safeName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.-]/g, '');
        const finalName = `${timestamp}-${safeName}`;

        this.docs.push({
          id_document: 0,
          user_id: this.user.id,
          username: this.user.username,
          file_category: '',
          id_category: 0,
          file_name: finalName,
          file_path: `/public/uploads/${finalName}`,
          file_type: file.type,
          uploaded_at: new Date(),
        });

      });
    }

    console.log(this.docs);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  addNewDocumentsDB(): void {
    Swal.fire({
      title: '¿Confirmar subida?',
      text: '¿Estás seguro de que deseas subir los documentos?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, subir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        LoaderService.mostrar('Subiendo Documentos');

        const requests = this.docs.map((doc: document, index) => {
          const formData = new FormData();
          formData.append('document', this.documentsUploaded![index]!, doc.file_name);
          formData.append('data', JSON.stringify(doc));

          return this.docsService.addNewDocument(formData).pipe(
            catchError(() => of({ ok: false })) // en caso de error, devolver un resultado falso
          );
        });

        forkJoin(requests).subscribe(results => {
          const exitosos = results.filter(r => r.ok).length;
          Swal.fire({
            title: 'Subida completa',
            text: `${exitosos} de ${this.docs.length} documentos subidos exitosamente.`,
            icon: 'success',
            timer: 2500,
            showConfirmButton: false,
          });
          this.documentsUploaded = null;
          this.docs = [];
        });

      }

    });

  }


  removeDocumentAfterUpload(index: number): void {
    this.docs.splice(index, 1);
  }

  cancelUpload(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminarán todos los documentos cargados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.isAddingNewDocument = !this.isAddingNewDocument;
        this.showFormDocument = false
        this.docs = [];
        this.documentsUploaded = null;
        Swal.fire({
          title: 'Cancelado',
          text: 'La carga de documentos ha sido eliminada.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

}
