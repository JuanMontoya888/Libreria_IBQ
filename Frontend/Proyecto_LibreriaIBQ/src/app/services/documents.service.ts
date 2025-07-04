import { Injectable } from '@angular/core';
import { document } from '../models/document';
import { documents } from '../../assets/documents';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documents!: Array<document>;

  constructor() {
    this.documents = documents;
  }

  getDocuments(): Array<document> {
    return this.documents;
  }
}
