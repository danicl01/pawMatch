import {Component, inject} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {FirestoreService} from "../../services/firestore.service";
import {Router} from "@angular/router";

@Component({
  selector: 'user-pet-profile',
  templateUrl: 'user-pet-profile.component.html',
  styleUrls: ['user-pet-profile.component.css'],
})
export class UserPetProfile {
  user$: Observable<any> | undefined;
  petName: string = ' ';
  petType: string = ' ';
  petBreed: string = ' ';
  petSex: string = ' ';
  petSexualStatus: string = ' ';
  petWeight: string = ' ';
  petSize: string = ' ';
  petAge: string = ' ';
  petDiseases: string = ' ';
  petDescription: string = ' ';
  petImage: string = ' ';
  petSearch: string = ' ';

  userId: string | null = null;

  _userService = inject(UserService);
  _fireService = inject(FirestoreService);
  _router = inject(Router);

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('User-pet-Profile - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'User-pet-Profile - PawMatch',
      },
    ])
  }

  ngOnInit(): void {
    this.userId = this._userService.getRandomUserId();
    if (this.userId) {
      this.user$ = this._fireService.getUser(this.userId);
      this.user$.subscribe(user => {
        this.petName = user.profilePet[0]?.name || 'Not specified';
        this.petType = user.profilePet[0]?.species || 'Not specified';
        this.petBreed = user.profilePet[0]?.breed || 'Not specified';
        this.petSex = user.profilePet[0]?.sex || 'Not specified';
        this.petSexualStatus = user.profilePet[0]?.sexualStatus || 'Not specified';
        this.petWeight = user.profilePet[0]?.weight || 'Not specified';
        this.petSize = user.profilePet[0]?.size || 'Not specified';
        this.petAge = user.profilePet[0]?.age || 'Not specified';
        this.petDiseases = user.profilePet[0]?.diseases || 'Not specified';
        this.petDescription = user.profilePet[0]?.description || 'Not specified';
        this.petImage = user.profilePet[0]?.picture || 'https://play.teleporthq.io/static/svg/default-img.svg';
        this.petSearch = user.profilePet[0]?.search || 'Not specified';
      });
    }
  }

  navigateWithUserId() {
    this._userService.setRandomUserId(this.userId);
    this._router.navigate(['/user-owner-profile']);
  }
}
