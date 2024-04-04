import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})

export class NoteServiceService {
  url: string = 'http://localhost:3000/notes';
  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.url);
  }

  addNote(note: any): Observable<Note> {
    return this.http.post<Note>(this.url, note);
  }

  addUser(form: User): Observable<User> {
    return this.http.post<User>(this.url, form);
  }

  getNote(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.url}/${id}`);
  }

  modifyNote(id: number, note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.url}/${id}`, note);
  }

  deleteNote(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }
}
