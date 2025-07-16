import { Injectable } from '@angular/core';
import { document_ } from '../models/documents';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { category } from '../models/categories';

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

  getDocumentByID(id_document: number): Observable<any> {
    return this.http.get(this.urapi_doc + `/getDocumentByID/${id_document}`,
      {
        responseType: 'blob'
      });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(this.urapi_cat + '/getAllCategories');
  }

  deleteDocumentByID(id_document: number): Observable<any> {
    return this.http.delete(this.urapi_doc + `/deleteDocument/${id_document}`);
  }

  deleteCategoryByID(id_category: number): Observable<any> {
    return this.http.delete(this.urapi_cat + `/deleteCategory/${id_category}`);
  }

  updateCategory(dataCategory: category, idCategory: number): Observable<any> {
    return this.http.post(this.urapi_cat + '/updateCategory', { dataCategory, idCategory });
  }

  updateDocument(dataDocument: document_, idDocument: number): Observable<any> {
    return this.http.post(this.urapi_doc + '/updateDocument', { dataDocument, idDocument });
  }

  addNewDocument(data: FormData): Observable<any> {
    return this.http.post(this.urapi_doc + '/addNewDocument', data);
  }

  addNewCategory(category: category): Observable<any> {
    return this.http.post(this.urapi_cat + '/addNewCategory', category);
  }
}
