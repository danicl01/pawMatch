import {Component, inject} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {AuthStateService} from "../../auth/data-access/auth-state.service";
import {FirestoreService} from "../../services/firestore.service";

@Component({
  selector: 'pet-profile',
  templateUrl: 'pet-profile.component.html',
  styleUrls: ['pet-profile.component.css'],
})
export class PetProfile {
  raw1b3g: string = ' '
  user$: Observable<any> | undefined;
  petName: string = ' ';
  petType: string = ' ';
  petBreed: string = ' ';
  petSex: string = ' ';
  petStatus: string = ' ';
  petWeight: string = ' ';
  petSize: string = ' ';
  petAge: string = ' ';
  petDiseases: string = ' ';
  petDescription: string = ' ';
  petImage: string = ' ';
  petSearch: string = ' ';

  userId: string | null = null;
  private _userService = inject(UserService);
  private _authState = inject(AuthStateService);
  private _fireService = inject(FirestoreService);
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Pet-Profile - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Pet-Profile - PawMatch',
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
        if (user.profilePet && user.profilePet.length > 0) {
          const pet = user.profilePet[0];
          this.petName = pet.name || 'No name available';
          this.petType = pet.species || 'Unknown type';
          this.petBreed = pet.breed || 'Unknown breed';
          this.petSex = pet.sex || 'Unknown sex';
          this.petStatus = pet.sexualStatus || 'Unknown status';
          this.petWeight = pet.weight || 'Unknown weight';
          this.petSize = pet.size || 'Unknown size';
          this.petAge = pet.age || 'Unknown age';
          this.petDiseases = pet.diseases || 'No known diseases';
          this.petDescription = pet.description || 'No description available';
          this.petSearch = pet.search || 'No search info';
        }
      });
    }
  }

}
