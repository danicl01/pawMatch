import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
})
export class Search {
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
  selectedSex: string = '';

  petBreeds = {
    Dog: [
      'German Shepherd', 'Labrador Retriever', 'Bulldog', 'Poodle', 'Chihuahua',
      'Beagle', 'Corgi', 'Dalmatian', 'Boxer', 'Cocker Spaniel', 'Shih Tzu',
      'Yorkshire Terrier', 'Pitbull', 'Rottweiler', 'Doberman', 'Golden Retriever',
      'French Bulldog', 'Boston Terrier', 'Pug', 'Maltese', 'Shetland Sheepdog',
      'Collie', 'Cane Corso', 'Great Dane', 'Basset Hound', 'Bloodhound',
      'Coonhound', 'Dachshund', 'Akita', 'Alaskan Malamute', 'Siberian Husky',
      'Samoyed', 'Chow Chow', 'Shar-Pei', 'Schnauzer', 'Airedale Terrier',
      'Cairn Terrier', 'West Highland White Terrier', 'Scottish Terrier',
      'Lhasa Apso', 'Cocker Spaniel', 'Springer Spaniel', 'Papillon',
      'Affenpinscher', 'German Pointer', 'Poodle', 'Canelo', 'Greyhound', 'Pointer'
    ],
    Cat: [
      'Sphynx', 'Persian', 'Maine Coon', 'British Shorthair', 'Siamese',
      'Abyssinian', 'Bengal', 'Savannah', 'Ragdoll', 'Birman', 'Himalayan',
      'Oriental Shorthair', 'Balinese', 'Javanese', 'Tonkinese', 'Russian Blue',
      'Siberian', 'Nebelung', 'Chartreux', 'Korat', 'Devon Rex', 'Cornish Rex',
      'Scottish Fold', 'Munchkin', 'American Curl', 'American Shorthair',
      'American Wirehair', 'Turkish Van', 'Turkish Angora', 'Somali', 'Ocicat',
      'Pixie-bob', 'Chausie', 'Cymric', 'Manx', 'Norwegian Forest Cat',
      'Siberian Shorthair', 'Balinese Longhair', 'Oriental Longhair',
      'Javanese Longhair', 'Colorpoint Shorthair', 'Calico', 'Torbie',
      'Tortoiseshell', 'Tabby', 'Egyptian Mau', 'Ocicat Bengal', 'Ashera',
      'Bengal Savannah', 'Kurilian Bobtail'
    ],
    Hamster: [
      'Roborovski', 'Campbell', 'Winter White (Djungarian)', 'Chinese Hamster',
      'Hybrid', 'Syrian Golden', 'Syrian Silver', 'Syrian Black', 'Syrian White',
      'Syrian Panda', 'Roborovski Albino', 'Campbell Albino',
      'Winter White Leucistic', 'Chinese Golden', 'Hybrid Calico'
    ]
  };

  filteredBreeds: string[] = [];

  constructor(private title: Title, private meta: Meta, private router: Router) {
    this.title.setTitle('Search - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Search - PawMatch',
      },
    ])
  }

  onTypeChange(): void {
    this.filteredBreeds = this.selectedType ? this.petBreeds[this.selectedType] || [] : [];
  }

  onFilterClick(): void {
    const filters = {
      selectedCountry: this.selectedCountry,
      selectedCity: this.selectedCity,
      selectedType: this.selectedType,
      selectedBreed: this.selectedBreed,
      selectedPetSex: this.selectedPetSex,
      selectedPetAge: this.selectedPetAge,
      selectedSexStatus: this.selectedSexStatus,
      selectedPersonAge: this.selectedPersonAge,
      selectedPersonSex: this.selectedPersonSex,
      selectedPersonJob: this.selectedPersonJob,
      selectedSchedule: this.selectedSchedule,
      selectedSex: this.selectedSex,
    };

    const queryParams = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});

    this.router.navigate(['/home'], { queryParams });
  }
}
