import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Note } from '../models/note';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteServiceService } from '../services/note-service.service';
import { RouterServiceService } from '../services/router-service.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css'],
})
export class NoteEditComponent implements OnInit {
  submitStatus = false;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private noteService: NoteServiceService,
    private routerService: RouterServiceService
  ) {}

  note: Note = {};
  formEdit = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  canDeactivate() {
    if (!this.submitStatus) {
      this.submitStatus = confirm(
        'You have unsaved changes. Are you sure, you want to leave?'
      );
    }
    return this.submitStatus;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data) => {
      let id = data.get('id') ?? 0;
      this.noteService.getNote(+id).subscribe((data) => {
        this.note = data;

        this.formEdit.setValue({
          title: `${this.note.title}`,
          content: `${this.note.content}`,
        });
      });
    });
  }

  editNote(formEdit: any) {
    let id: any = this.note.id;
    let editForm: Note = formEdit.value as Note;
    this.noteService.modifyNote(id, editForm).subscribe((data) => {
      this.submitStatus = true;
      this.routerService.navigateToNotesView();
    });
  }
}
