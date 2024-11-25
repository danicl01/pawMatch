import {Component, inject, OnInit} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {Observable} from "rxjs";
import {AuthStateService} from "../../auth/data-access/auth-state.service";
import {UserService} from "../../services/user.service";
import {FirestoreService} from "../../services/firestore.service";

@Component({
  selector: 'owner-profile',
  templateUrl: 'owner-profile.component.html',
  styleUrls: ['owner-profile.component.css'],
})
export class OwnerProfile implements OnInit{
  user$: Observable<any> | undefined;
  ownerName: string = ' ';

  userId: string | null = null;
  private _userService = inject(UserService);
  private _authState = inject(AuthStateService);
  private _fireService = inject(FirestoreService);
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Owner-Profile - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Owner-Profile - PawMatch',
      },
    ])
  }

  async ngOnInit(): Promise<void> {
    await this.getUserId();
    this.loadUser();
  }

  async getUserId(): Promise<void> {
    const currentUser = await this._authState.currentUser;
    if (currentUser && currentUser.uid) {
      this.userId = currentUser.uid;
      console.log('ID del usuario autenticado:', this.userId);
    } else {
      console.error('No hay usuario autenticado');
    }
  }

  loadUser(): void {
    if (this.userId) {
      this.user$ = this._fireService.getDataFromCurrentAuthUser(this.userId);
      this.user$.subscribe(user => {
        console.log(user);
        this.ownerName = user.firstName;
      });
    }
  }

}
