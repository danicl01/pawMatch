import { Component, OnInit } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {FirestoreService} from "../../services/firestore.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class Home implements OnInit {
  rawdjrt: string = ' '
  constructor(private title: Title, private meta: Meta,private firestoreService: FirestoreService) {
    this.title.setTitle('Home - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Home - PawMatch',
      },
    ]);
  }
  ngOnInit(): void {
    this.loadData();
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

      // Si hay mascotas, podemos asignar el nombre del primero
      if (petsData.length > 0) {
        this.rawdjrt = petsData[0].name; // Asume que quieres el nombre de la primera mascota
      }
    });

    // O bien, si sabes el petId, puedes acceder a una mascota en específico
    this.firestoreService.getPetName(userId, petId).subscribe((petData: any) => {
      console.log('Pet Data:', petData);
      this.rawdjrt = petData.name; // Asume que el campo del nombre se llama 'name'
    });
  }
}
