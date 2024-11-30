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
  savedUserIdList: string[] = [];
  selectedUserId: any = null;

  pet_name: string = ' '
  pet_breed: string = ' '
  pet_sex: string = ' '
  pet_age: string = ' '
  pet_weight: string = ' '
  pet_size: string = ' '
  pet_search: string = ' '
  pet_image: string = ' '

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

  async handleRemoveUser(selectedUser: string): Promise<void> {
    console.log(selectedUser);
    if (!this.savedUserIdList || !this.selectedUserId) return;

    this.savedUserIdList = this.savedUserIdList.filter(id =>
        id !== selectedUser
    );

    try {
      await this._fireService.updateSavedUser(this.userId, this.savedUserIdList);
      console.log(`Usuario ${selectedUser} eliminado correctamente de savedUsers.`);
    } catch (error) {
      console.error('Error al eliminar el usuario de savedUsers:', error);
    }
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

  async handleSelectUser(userId: string): Promise<void> {
      if (userId) {
        console.log(userId);
      this.user$ = this._fireService.getUser(userId);
      this.user$.subscribe(user => {
        if (user && user.profilePet) {
          const petId = Object.keys(user.profilePet)[0];
          const pet = user.profilePet[petId];

          if (pet) {
            this.pet_name = pet.name;
            this.pet_breed = pet.breed;
            this.pet_age = pet.age;
            this.pet_weight = pet.weight;
            this.pet_size = pet.size;
            this.pet_search = pet.search;
            this.pet_image = pet.picture;
          }
        }
      });
  }
  }


  loadUser(): void {
    if (this.userId) {
      this.user$ = this._fireService.getDataFromCurrentAuthUser(this.userId);
      this.user$.subscribe(user => {
        this.savedUserIdList = user.savedUsers || [];
      });
    }
  }
}
