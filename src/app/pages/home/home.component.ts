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

  selectedPetSex: string = '';
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
      this.selectedPetSex = params['sex'] || '';
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
      this.name = "Petao chaval";
      this.breed = "Sin raza";
      this.age = "0";
      this.weight = "0.0";
      this.size = "0.0";
      this.search = "NADA";
      this.visitedProfiles = [];
    }
  }

  loadData2(userId: string) {

    this.firestoreService.getPets(userId).subscribe((petsData: any[]) => {
      console.log('Pets Data:', petsData);

      if (this.selectedPetSex) {
        this.filteredPets = petsData.filter(pet => pet.sex === this.selectedPetSex);
      } else {
        this.filteredPets = petsData;
      }

      if (this.filteredPets.length > 0) {
        this.name = petsData[0].name;
        this.breed = petsData[0].breed;
        this.age = petsData[0].age;
        this.weight = petsData[0].weight;
        this.size = petsData[0].size;
        this.search = petsData[0].search;

      }
    });
  }
}
