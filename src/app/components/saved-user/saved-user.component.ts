import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-saved-user',
  templateUrl: './saved-user.component.html',
  styleUrls: ['saved-user.component.css'],
})
export class SavedUserComponent {
  rawa76r: string = ' '
  rawewy0: string = ' '
  @Input() userId: string | undefined;
  @Output() removeUser = new EventEmitter<string>();
  @Output() selectUser = new EventEmitter<string>();

  constructor() { }

  onRemoveUser() {
    if (this.userId) {
      this.removeUser.emit(this.userId);
    }
  }

  onSelectUser() {
    if (this.userId) {
      this.selectUser.emit(this.userId);
    }
  }
}
