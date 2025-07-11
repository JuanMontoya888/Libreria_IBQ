import { Injectable } from '@angular/core';
import { document } from '../models/document';
import { documents } from '../../assets/documents';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  urapi_doc: string = 'http://127.0.0.1:3000/documents';
  urapi_cat: string = 'http://127.0.0.1:3000/categories';

  constructor(
    private http: HttpClient
  ) { }

  getAllDocuments(): Observable<any> {
    return this.http.get(this.urapi_doc + '/getAllDocuments');
  }

  getAllCategories(): Observable<any> {
    return this.http.get(this.urapi_cat + '/getAllCategories');
  }

  getDocuments2(): Array<document> {
    return documents;
  }

  deleteDocumentByID(id_document: number): Observable<any> {
    return this.http.delete(this.urapi_doc + `/deleteDocument/${id_document}`);
  }
}
