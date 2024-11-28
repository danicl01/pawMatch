import { Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AuthStateService } from "../../auth/data-access/auth-state.service";
import { FirestoreService } from "../../services/firestore.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-saves',
  templateUrl: 'saves.component.html',
  styleUrls: ['saves.component.css'],
})
export class Saves implements OnInit {
  user$: Observable<any> | undefined;
  userId: string | null = null;
  private _authState = inject(AuthStateService);
  private _fireService = inject(FirestoreService);
  savedUserList: string[] = []; // Array de ids de usuarios guardados

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Saves - PawMatch');
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Saves - PawMatch',
      },
    ]);
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
        this.savedUserList = user.savedUsers || [];
      });
    }
  }
}
