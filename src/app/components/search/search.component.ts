import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() searchUsername = new EventEmitter<string>();
  username: string = '';

  onSubmit() {
    if (this.username.trim() !== '') {
      this.searchUsername.emit(this.username);
      console.log(this.username);
    }
  }
}
