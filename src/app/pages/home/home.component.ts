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
  rawdjrt: string = ' '
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
      this.rawdjrt = "Petao chaval";
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
        this.rawdjrt = petsData[0].name;
      }
    });
  }
}
