import { Injectable } from '@angular/core';
import { document } from '../models/document';
import { documents } from '../../assets/documents';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  urapi: string = 'http://127.0.0.1:3000/documents';

  constructor(
    private http: HttpClient
  ) { }

  getDocuments(): Observable<any> {
    return this.http.get(this.urapi + '/getAllDocuments');
  }

  getDocuments2(): Array<document> {
    return documents;
  }
}
