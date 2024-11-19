import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {map, Observable, of, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  getUser(userId: string): Observable<any> {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  getPets(userId: string): Observable<any[]> {
    return this.firestore.collection('users').doc(userId).collection('profile_pet').valueChanges();
  }

  getPerson(userId: string): Observable<any[]> {
    return this.firestore.collection('users').doc(userId).collection('profile_person').valueChanges();
  }

  async getRandomUser(visitedProfiles: string[]): Promise<string | null> {
    const usersSnapshot = await this.firestore.collection('users').get().toPromise();
    if (usersSnapshot.empty) return null;
    const availableUsers = usersSnapshot.docs.filter(
        doc => !visitedProfiles.includes(doc.id)
    );
    if (availableUsers.length === 0) return null;
    const randomUserDoc = availableUsers[Math.floor(Math.random() * availableUsers.length)];
    visitedProfiles.push(randomUserDoc.id);
    return randomUserDoc.id;
  }

  getPetName(userId: string, petId: string): Observable<any> {
    return this.firestore
        .collection('users')
        .doc(userId)
        .collection('profile_pet')
        .doc(petId)
        .valueChanges();
  }
}
