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

  getDataFromCurrentAuthUser(userId: string): Observable<any> {
    return this.firestore.collection('users', ref => ref.where('userId', '==', userId))
        .valueChanges()
        .pipe(
            map(users => users[0])
        );
  }

  getPets(userId: string): Observable<any[]> {
    return this.firestore.collection('users').doc(userId).valueChanges().pipe(
        map((userData: any) => userData?.profilePet || []) //
    );
  }

  getPerson(userId: string): Observable<any[]> {
    return this.firestore.collection('users').doc(userId).valueChanges().pipe(
        map((userData: any) => userData?.profilePerson || []) //
    );
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
}
