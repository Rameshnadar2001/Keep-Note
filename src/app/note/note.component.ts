import { Component, Input } from '@angular/core';
import { Note } from '../models/note';
import { Router } from '@angular/router';
import { NoteServiceService } from '../services/note-service.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent {
  @Input() note?: any;
  isHovered: boolean = false;

constructor(private router: Router, private noteService: NoteServiceService){}

  buttonVisibility() {
    this.isHovered = true;
  }
  onMouseLeave() {
    this.isHovered = false;
  }
  navigateToEdit(note: any){
    this.router.navigate(["/notes", note.id])
  }

  delete(note: any){
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");

    if(confirmDelete){
      this.noteService.deleteNote(note.id).subscribe((data) => {
        window.location.reload();
        this.router.navigate(['']);
      });
    }
    
  }
}
