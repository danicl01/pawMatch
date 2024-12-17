import {Component, inject} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {Router} from "@angular/router";
import { petBreeds, PetType } from '../../models/pet-type.enums';

interface FilterOptions {
  selectedCountry: string;
  selectedCity: string;
  selectedType: string;
  selectedBreed: string;
  selectedPetSex: string;
  selectedPetAge: string;
  selectedSexStatus: string;
  selectedPersonAge: string;
  selectedPersonSex: string;
  selectedPersonJob: string;
  selectedSchedule: string;
}

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
})
export class Search {
  filters: FilterOptions = {
    selectedCountry: '',
    selectedCity: '',
    selectedType: '',
    selectedBreed: '',
    selectedPetSex: '',
    selectedPetAge: '',
    selectedSexStatus: '',
    selectedPersonAge: '',
    selectedPersonSex: '',
    selectedPersonJob: '',
    selectedSchedule: '',
  };

  petTypes = Object.values(PetType);
  selectedPetType: PetType = PetType.Dog;

  filteredBreeds: string[] = [];
  private _router = inject(Router);

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Search - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Search - PawMatch',
      },
    ])
  }

  onTypeChange(): void {
    this.filteredBreeds = petBreeds[this.filters.selectedType as PetType] || [];
  }

  onFilterClick(): void {
    const queryParams = Object.entries(this.filters)
        .filter(([_, value]) => value !== '')
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

    this._router.navigate(['/home'], { queryParams });
  }
}
