import {Component, inject} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {FirestoreService} from "../../services/firestore.service";
import {Router} from "@angular/router";
import {AuthStateService} from "../../auth/data-access/auth-state.service";

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

  currentId: string | null = null;
  userId: string | null = null;

  private _authState = inject(AuthStateService);
  private _userService = inject(UserService);
  private _fireService = inject(FirestoreService);
  private _router = inject(Router);
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('User-owner-Profile - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'User-owner-Profile - PawMatch',
      },
    ])
  }

  async ngOnInit(): Promise<void> {
    await this.getUserId();
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

  async getUserId(): Promise<void> {
    const currentUser = await this._authState.currentUser;
    if (currentUser && currentUser.uid) {
      this.currentId = currentUser.uid;
      console.log('ID del usuario autenticado:', this.currentId);
    } else {
      console.error('No hay usuario autenticado');
    }
  }


  saveUser(): void {
    this._fireService.addToSavedUsers(this.currentId, this.userId).subscribe({
      next: () => {
        console.log('User successfully added to the saved list.');
      },
      error: err => {
        console.error('Error adding user to the saved list:', err);
      }
    });
  }
  onIconClick() {
    this._router.navigate(['/mailbox'], {
      queryParams: { selectedUserId: this.userId }
    });
  }

  navigateWithUserId() {
    this._userService.setRandomUserId(this.userId);
    this._router.navigate(['/user-pet-profile']);
  }
}
