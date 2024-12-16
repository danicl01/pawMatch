import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {FirestoreService} from "../../services/firestore.service";
import {ActivatedRoute} from "@angular/router";
import {AuthStateService} from "../../auth/data-access/auth-state.service";
import {map, Observable, of} from "rxjs";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class Home implements OnInit {
  usersList: string[] = [];
  currentIndex: number = 0;
  userAuthId: string | null = null;
  userAuthDocId: string | null = null;
  currentView: 'pet' | 'person' = 'pet';
  userId: string | null = null;

  city: string = ' '
  country: string = ' '

  selectedCity: string = '';
  selectedCountry: string = '';

  selectedType: string = '';
  selectedBreed: string = '';
  selectedPetSex: string = '';
  selectedPetAge: string = '';
  selectedSexStatus: string = '';

  selectedPersonAge: string = '';
  selectedPersonSex: string = '';
  selectedPersonJob: string = '';
  selectedSchedule: string = '';

  private _authState = inject(AuthStateService);
  private firestoreService = inject(FirestoreService);
  constructor(
      private title: Title,
      private meta: Meta,
      private route: ActivatedRoute) {

    this.title.setTitle('Home - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Home - PawMatch',
      },
    ]);
  }

  async ngOnInit(): Promise<void> {
    await this.getAuthenticatedUserId();
    this.loadFilterParams();
    await this.loadUsers();
  }

  loadFilterParams() {
    this.route.queryParams.subscribe(params => {
      this.selectedCountry = params['selectedCountry'] || '';
      this.selectedCity = params['selectedCity'] || '';
      this.selectedType = params['selectedType'] || '';
      this.selectedBreed = params['selectedBreed'] || '';
      this.selectedPetSex = params['selectedPetSex'] || '';
      this.selectedPetAge = params['selectedPetAge'] || '';
      this.selectedSexStatus = params['selectedSexStatus'] || '';
      this.selectedPersonAge = params['selectedPersonAge'] || '';
      this.selectedPersonSex = params['selectedPersonSex'] || '';
      this.selectedPersonJob = params['selectedPersonJob'] || '';
      this.selectedSchedule = params['selectedSchedule'] || '';
    });
  }

  async getAuthenticatedUserId(): Promise<void> {
    const currentUser = await this._authState.currentUser;
    if (currentUser && currentUser.uid) {
      this.userAuthId = currentUser.uid;
      this.firestoreService.getDocIdFromUserId(currentUser.uid).subscribe(docId => {
        if (docId) {
          this.userAuthDocId = docId;
        } else {
          console.error('No se encontró docId para este userId');
        }
      });
    } else {
      console.error('There is not auth user.');
    }
  }

  async loadUsers() {
    try {
      const userIds = await this.firestoreService.getRandomUsers(this.usersList);
      if (!userIds) return;

      const filteredUsers = [];
      for (const userId of userIds) {
        const passesFilters = await this.applyFilters(userId);
        if (passesFilters && userId !== this.userAuthDocId) {
          filteredUsers.push(userId);
        }
      }
      this.usersList.push(...filteredUsers);
      this.updateCurrentUser();
    } catch (error) {
      console.error('Error loading users: ', error);
    }
  }


  private matchesField(fieldValue: any, selectedValue: any): boolean {
    return !selectedValue || fieldValue === selectedValue;
  }

  async applyFilters(userId: string): Promise<boolean> {
    try {
      const user = await this.firestoreService.getUserDataById(userId);
      if (!user) return false;

      const pet = user.profilePet?.[0];
      const person = user.profilePerson;

      return this.matchesField(user.city, this.selectedCity) &&
          this.matchesField(user.country, this.selectedCountry) &&
          this.matchesField(pet?.sex, this.selectedPetSex) &&
          this.matchesField(pet?.species, this.selectedType) &&
          this.matchesField(pet?.breed, this.selectedBreed) &&
          this.matchesField(person?.sex, this.selectedPersonSex) &&
          this.matchesField(person?.job, this.selectedPersonJob) &&
          this.matchesField(person?.schedule, this.selectedSchedule);
    } catch (error) {
      console.error("Error al aplicar filtros: ", error);
      return false;
    }
  }


  switchToPet(): void {
    this.currentView = 'pet';
  }

  switchToPerson(): void {
    this.currentView = 'person';
  }

  async nextUser(): Promise<void> {
    if (this.currentIndex < this.usersList.length - 1) {
      this.currentIndex++;
      this.updateCurrentUser();
    } else {
      await this.loadUsers();
    }
  }

  prevUser(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCurrentUser();
    }
  }

  updateCurrentUser(): void {
    this.userId = this.usersList[this.currentIndex];
  }
}
