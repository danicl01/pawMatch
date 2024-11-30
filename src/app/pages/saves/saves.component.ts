import {Component, inject, OnInit, SimpleChanges} from '@angular/core';
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
  currentView: 'pet' | 'person' = 'pet';
  user$: Observable<any> | undefined;
  userId: string | null = null;
  selectedUserId: string | null = null;
  private _authState = inject(AuthStateService);
  private _fireService = inject(FirestoreService);
  savedUserIdList: string[] = [];

  pet_name: string = ' '
  pet_breed: string = ' '
  pet_age: string = ' '
  pet_weight: string = ' '
  pet_size: string = ' '
  pet_search: string = ' '
  pet_image: string = ' '

  owner_age: string = ' '
  owner_job: string = ' '
  owner_name: string = ' '
  owner_picture: string = ' '
  owner_schedule: string = ' '
  owner_sex: string = ' '

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
    this.loadCurrentUser();
  }

  async handleRemoveUser(selectedUser: string): Promise<void> {
    if (!this.savedUserIdList || !selectedUser) return;

    this.savedUserIdList = this.savedUserIdList.filter(id =>
        id !== selectedUser
    );
    this.selectedUserId = null;
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
        if (user && user.profilePet && user.profilePerson) {
          const petId = Object.keys(user.profilePet)[0];
          const pet = user.profilePet[petId];

          if (pet) {
            this.selectedUserId = userId;
            this.pet_name = pet.name;
            this.pet_breed = pet.breed;
            this.pet_age = pet.age;
            this.pet_weight = pet.weight;
            this.pet_size = pet.size;
            this.pet_search = pet.search;
            this.pet_image = pet.picture;
          }

          const personId = Object.keys(user.profilePerson);
          const person = user.profilePerson;

          if (person) {
            this.owner_age = person.name;
            this.owner_job = person.job;
            this.owner_name = person.name;
            this.owner_picture = person.picture;
            this.owner_schedule = person.schedule;
            this.owner_sex = person.sex;
          }
        }
      });
  } else {
        this.clearData();
      }
  }

  loadCurrentUser(): void {
    if (this.userId) {
      this.user$ = this._fireService.getDataFromCurrentAuthUser(this.userId);
      this.user$.subscribe(user => {
        this.savedUserIdList = user.savedUsers || [];
      });
    }
  }

  switchToPet(): void {
    this.currentView = 'pet';
  }

  switchToPerson(): void {
    this.currentView = 'person';
  }

  clearData(): void {
    this.pet_name = '';
    this.pet_breed = '';
    this.pet_age = '';
    this.pet_weight = '';
    this.pet_size = '';
    this.pet_search = '';
    this.pet_image = '';

    this.owner_age = '';
    this.owner_job = '';
    this.owner_name = '';
    this.owner_picture = '';
    this.owner_schedule = '';
    this.owner_sex = '';
  }
}
