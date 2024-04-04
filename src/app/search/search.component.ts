import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
title:string="";

@Output() searchNote:EventEmitter<string> = new EventEmitter<string>();
searchInput(){
  this.searchNote.emit(this.title);
}
}
