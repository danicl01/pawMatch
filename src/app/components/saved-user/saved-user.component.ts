import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-saved-user',
  templateUrl: './saved-user.component.html',
  styleUrls: ['saved-user.component.css'],
})
export class SavedUserComponent {
  rawa76r: string = ' '
  rawewy0: string = ' '
  @Input() userId: string | undefined;
}
