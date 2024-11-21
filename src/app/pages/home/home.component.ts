import { Component, OnInit } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {FirestoreService} from "../../services/firestore.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class Home implements OnInit {
  owner_name: string = ' '
  city: string = ' '
  country: string = ' '
  name: string = ' '
  breed: string = ' '
  sex: string = ' '
  age: string = ' '
  weight: string = ' '
  size: string = ' '
  search: string = ' '
  image: string = ' '

  selectedCountry: string = '';
  selectedCity: string = '';
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
  ngOnInit(): void {
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

  async loadData() {
    const userId = await this.firestoreService.getRandomUser(this.visitedProfiles);

    if (userId) {
      console.log('Usuario aleatorio:', userId);
      this.loadData2(userId);
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
  }

  setPetValues(pet: any) {
    this.name = pet.name;
    this.breed = pet.breed;
    this.age = pet.age;
    this.weight = pet.weight;
    this.size = pet.size;
    this.search = pet.search;
  }

  setDefaultValues() {
    this.name = "No name";
    this.breed = "No breed";
    this.age = "0";
    this.weight = "0.0";
    this.size = "0.0";
    this.search = "Nothing";
    this.visitedProfiles = [];
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
