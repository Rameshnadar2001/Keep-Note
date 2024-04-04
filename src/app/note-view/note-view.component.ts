import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';
import { Notes } from '../models/notes';
import { NoteServiceService } from '../services/note-service.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css'],
})
export class NoteViewComponent implements OnInit {
  notes: Note[] = [];
  isSelected: boolean = false;

  constructor(private noteService: NoteServiceService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe({
      next: (data) => {
        this.notes = data;
      },
      error: (error) => {
        alert('Failed to Fetch Notes Due to Server Error !!');
      },
    });
  }
  onSearchNote(title: string) {
    this.noteService.getNotes().subscribe({
      next: (data) => {
        if (title === '' || !title) {
          this.notes = data;
        } else {
          this.notes = data.filter((note) =>
            note.title?.toLowerCase().startsWith(title.toLowerCase())
          );
        }
      },
      error: (error) => {
        alert('Failed to Fetch Notes Due to Server Error !!');
      },
    });
  }

  onButtonClick() {
    this.isSelected = !this.isSelected;
  }
}
