import { Component, EventEmitter, Output } from '@angular/core';
import { Note } from '../models/note';
import { NoteServiceService } from '../services/note-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css'],
})
export class NoteAddComponent {
  note: Note = {};
  constructor(private noteService: NoteServiceService, private _snackBar: MatSnackBar) {}
  addNewNote(form:any) {
    this.noteService.addNote(this.note).subscribe({
      next: (data) => {
        this._snackBar.open("Note added successfully", 'success', {
          duration:5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        })
      },
      error: (error) => {
        alert('Failed to Add Note Due to Server Error !!');
      },
    });
    form.resetForm();
  }
}
