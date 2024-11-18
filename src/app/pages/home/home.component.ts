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

  loadData() {
    const userId = 'MPjZtMOT8i54Te7hkEvF'; // ID del primer usuario
    const petId = 'IOpq3iC10m4G945ty1As'; // ID de la mascota

    // Primero, obtenemos los datos del usuario (opcional)
    this.firestoreService.getUser(userId).subscribe((userData: any) => {
      console.log('User Data:', userData);
    });

    // Luego, obtenemos las mascotas del usuario
    this.firestoreService.getPets(userId).subscribe((petsData: any[]) => {
      console.log('Pets Data:', petsData);

      // Filtrar mascotas por sexo si hay un filtro seleccionado
      if (this.selectedPetSex) {
        this.filteredPets = petsData.filter(pet => pet.sex === this.selectedPetSex);
      } else {
        this.filteredPets = petsData;  // Mostrar todas las mascotas si no se selecciona un filtro
      }


      /*
      if (this.filteredPets.length > 0) {
        this.rawdjrt = petsData[0].name; // Asume que quieres el nombre de la primera mascota
      }

       */
      if (this.selectedPetSex === "Male") {
          this.rawdjrt = "Manolo";
      } else if (this.selectedPetSex === "Female") {
        this.rawdjrt = "Ramona";
      } else {
        this.rawdjrt = "Nada";
      }
    });

    // O bien, si sabes el petId, puedes acceder a una mascota en específico
    /*
    this.firestoreService.getPetName(userId, petId).subscribe((petData: any) => {
      console.log('Pet Data:', petData);
      this.rawdjrt = petData.name;
    });

     */
  }
}
