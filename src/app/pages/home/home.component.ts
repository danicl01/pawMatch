import {Component, inject, OnInit} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {FirestoreService} from "../../services/firestore.service";
import {ActivatedRoute} from "@angular/router";
import {AuthStateService} from "../../auth/data-access/auth-state.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class Home implements OnInit {
  currentView: 'pet' | 'person' = 'pet';
  currentUserId: string | null = null;

  city: string = ' '
  country: string = ' '

  pet_name: string = ' '
  pet_breed: string = ' '
  pet_sex: string = ' '
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

  filteredPets: any[] = [];
  visitedProfiles: string[] = [];

  private _authState = inject(AuthStateService);
  constructor(
      private title: Title,
      private meta: Meta,
      private firestoreService: FirestoreService,
      private route: ActivatedRoute) {

    this.title.setTitle('Home - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Home - PawMatch',
      },
    ]);
  }

  async getUserId(): Promise<void> {
    const currentUser = await this._authState.currentUser;
    if (currentUser && currentUser.uid) {
      this.currentUserId = currentUser.uid;
      console.log('ID del usuario autenticado:', this.currentUserId);
    } else {
      console.error('No hay usuario autenticado');
    }
  }
  async ngOnInit(): Promise<void> {
    await this.getUserId();
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

      this.loadData();
    });
  }

  switchToPet(): void {
    this.currentView = 'pet';
  }

  switchToPerson(): void {
    this.currentView = 'person';
  }

  async loadData() {
    const userId = await this.firestoreService.getRandomUser(this.visitedProfiles);

    if (userId) {
      this.firestoreService.getUserIdFromDocId(userId).subscribe(
          (docUserId: string | null) => {
            if (docUserId === this.currentUserId) {
              console.log('El usuario aleatorio es el mismo que el usuario actual. Buscando otro...');
              this.loadNextUser();
            } else {
              console.log('Cargando usuario aleatorio:', userId);
              this.loadData2(userId);
            }
          },
          (error) => {
            console.error('Error al obtener el userId:', error);
            this.setDefaultValues();
          }
      );
    } else {
      console.log('No hay usuarios disponibles');
      this.setDefaultValues();
    }
  }

  loadData2(userId: string) {
    this.firestoreService.getPets(userId).subscribe(
        (petsData: any[]) => {
          console.log('Pets Data:', petsData);

          // Filtra las mascotas que cumplen con los filtros.
          this.filteredPets = petsData.filter(pet => {
            const sexMatch = (this.selectedPetSex === '' || pet.sex === this.selectedPetSex);

            let ageMatch = true;
            if (this.selectedPetAge) {
              const ageRange = this.selectedPetAge.split('-');
              if (ageRange.length === 2) {
                const minAge = parseInt(ageRange[0], 10);
                const maxAge = parseInt(ageRange[1], 10);
                ageMatch = pet.age >= minAge && pet.age <= maxAge;
              } else {
                ageMatch = pet.age === parseInt(this.selectedPetAge, 10);
              }
            }
            return sexMatch && ageMatch;
          });

          if (this.filteredPets.length > 0) {
            this.setPetValues(this.filteredPets[0]);
          } else {
            this.loadNextUser();
          }
        },
        (error) => {
          console.error('Error al obtener mascotas:', error);
          this.setDefaultValues();
        }
    );
    this.firestoreService.getPerson(userId).subscribe(
        (personData: any) => {
          console.log('Person Data:', personData);
          this.setPersonValues(personData);
        },
        (error) => console.error('Error al obtener persona:', error)
    );
  }

  setPetValues(pet: any) {
    this.pet_name = pet.name;
    this.pet_breed = pet.breed;
    this.pet_age = pet.age;
    this.pet_weight = pet.weight;
    this.pet_size = pet.size;
    this.pet_search = pet.search;
    this.pet_image = pet.picture;
  }

  setPersonValues(person: any) {
    this.owner_name = person.name;
    this.owner_age = person.age;
    this.owner_sex = person.sex;
    this.owner_job = person.job;
    this.owner_schedule = person.schedule;
    this.owner_picture = person.picture;
  }

  setDefaultValues() {
    this.pet_name = "No name";
    this.pet_breed = "No breed";
    this.pet_age = "0";
    this.pet_weight = "0.0";
    this.pet_size = "0.0";
    this.pet_search = "Nothing";
    this.pet_image = 'https://play.teleporthq.io/static/svg/default-img.svg';
    this.visitedProfiles = [];

    this.owner_name = "No data";
    this.owner_age = "0";
    this.owner_sex = "No data";
    this.owner_job = "No data";
    this.owner_schedule = "No data";
    this.owner_picture = 'https://play.teleporthq.io/static/svg/default-img.svg';
  }

  loadNextUser() {
    this.firestoreService.getRandomUser(this.visitedProfiles).then((nextUserId) => {
      if (nextUserId) {
        this.loadData2(nextUserId);
      } else {
        console.log('No más usuarios disponibles que cumplan los filtros');
        this.setDefaultValues();
      }
    });
  }


}
