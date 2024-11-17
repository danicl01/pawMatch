import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Obtener un documento de la colección de usuarios
  getUser(userId: string): Observable<any> {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  // Obtener los datos de la subcolección de mascotas del usuario
  getPets(userId: string): Observable<any[]> {
    return this.firestore.collection('users').doc(userId).collection('profile_pet').valueChanges();
  }

  // Obtener el nombre de una mascota en específico
  getPetName(userId: string, petId: string): Observable<any> {
    return this.firestore
        .collection('users')
        .doc(userId)
        .collection('profile_pet')
        .doc(petId)
        .valueChanges();
  }
}
