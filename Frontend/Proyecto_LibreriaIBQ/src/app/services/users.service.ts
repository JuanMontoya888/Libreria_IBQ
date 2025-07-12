import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private urapi: string = 'http://127.0.0.1:3000/users';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.urapi + '/login', { username, password });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.urapi + '/getAllUsers');
  }

  addNewUser(user: user): Observable<any> {
    return this.http.post(this.urapi + '/addNewUser', { user });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.urapi + `/deleteUser/${id}`);
  }

  updateUser(id: number, data: user): Observable<any> {
    return this.http.post(this.urapi + '/updateUser', { id, data });
  }

  addNewUsers(files: any): Observable<any> {
    return this.http.post(this.urapi + '/addNewUsers', files/*,
      { reportProgress: true, observe: 'events' }*/);
  }
}
