import {Component, inject} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {FirestoreService} from "../../services/firestore.service";

@Component({
  selector: 'user-owner-profile',
  templateUrl: 'user-owner-profile.component.html',
  styleUrls: ['user-owner-profile.component.css'],
})
export class UserOwnerProfile {
  user$: Observable<any> | undefined;
  ownerName: string = ' ';
  ownerSex: string = ' ';
  ownerAge: string = ' ';
  ownerJob: string = ' ';
  ownerSchedule: string = ' ';
  ownerDescription: string = ' ';
  ownerImage: string = ' ';
  ownerLocation: string = ' ';

  userId: string | null = null;

  _userService = inject(UserService);
  _fireService = inject(FirestoreService);
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('User-owner-Profile - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'User-owner-Profile - PawMatch',
      },
    ])
  }

  ngOnInit(): void {
    this.userId = this._userService.getRandomUserId();
    if (this.userId) {
      this.user$ = this._fireService.getUser(this.userId);
      this.user$.subscribe(user => {
        this.ownerName = user.profilePerson?.name || 'Not specified';
        this.ownerSex = user.profilePerson?.sex || 'Not specified';
        this.ownerAge = user.profilePerson?.age || 'Not specified';
        this.ownerJob = user.profilePerson?.job || 'Not specified';
        this.ownerSchedule = user.profilePerson?.schedule || 'Not specified';
        this.ownerDescription = user.profilePerson?.description || 'Not specified';
        this.ownerLocation =
            (user.city && user.country ? `${user.city}, ${user.country}` : 'Location not available');
        this.ownerImage = user.profilePerson?.picture || 'https://play.teleporthq.io/static/svg/default-img.svg';
      });
    }
  }
}
