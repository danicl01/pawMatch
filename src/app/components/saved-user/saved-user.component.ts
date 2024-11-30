import {Component, EventEmitter, inject, Input, Output, SimpleChanges} from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";

@Component({
  selector: 'app-saved-user',
  templateUrl: './saved-user.component.html',
  styleUrls: ['saved-user.component.css'],
})
export class SavedUserComponent {
  rawa76r: string = ' '
  rawewy0: string = ' '
  @Input() userId: string | undefined;
  @Input() type: string | "pet";
  name: string = " ";
  image: string = ' ';

  @Output() removeUser = new EventEmitter<string>();
  @Output() selectUser = new EventEmitter<string>();

  private _fireService = inject(FirestoreService);

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type'] || changes['userId']) {
      this.fetchUserData();
    }
  }


  private fetchUserData() {
    this.name = 'Loading...';
    this.image = 'https://play.teleporthq.io/static/svg/default-img.svg';

    if (!this.userId) return;

    if (this.type === 'pet') {
      this._fireService.getPets(this.userId).subscribe((pets) => {
        if (pets.length > 0) {
          this.name = pets[0]?.name || 'Unknown Pet';
          this.image = pets[0]?.picture || 'https://play.teleporthq.io/static/svg/default-img.svg';
        } else {
          this.name = 'No Pets Found';
        }
      });
    } else if (this.type === 'person') {
      this._fireService.getPerson(this.userId).subscribe((person) => {
        if (person) {
          this.name = person.name || 'Unknown Person';
          this.image = person.picture || 'https://play.teleporthq.io/static/svg/default-img.svg';
        } else {
          this.name = 'No Person Found';
        }
      });
    }
  }

  onRemoveUser() {
    if (this.userId) {
      this.removeUser.emit(this.userId);
      this.selectUser.emit(null);
    }
  }

  onSelectUser() {
    if (this.userId) {
      this.selectUser.emit(this.userId);
    }
  }
}
