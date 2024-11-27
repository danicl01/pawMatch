import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {BehaviorSubject, map, Observable, of, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  getUser(userId: string): Observable<any> {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  getUserIdFromDocId(docId: string): Observable<string | null> {
    return this.firestore.collection('users').doc(docId).valueChanges().pipe(
        map((docData: any) => docData?.['userId'] || null)
    );
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

    addToSavedUsers(userId: string, selectedUserId: string): Observable<void> {
        return this.firestore
            .collection('users', ref => ref.where('userId', '==', userId))
            .get()
            .pipe(
                switchMap(querySnapshot => {
                    if (querySnapshot.empty) {
                        throw new Error(`No user found with userId ${userId}`);
                    }
                    const userDoc = querySnapshot.docs[0];
                    const userData: any = userDoc.data();
                    const savedUsers: string[] = userData.savedUsers || [];

                    if (savedUsers.includes(selectedUserId)) {
                        return of();
                    }
                    const updatedSavedUsers = [...savedUsers, selectedUserId];
                    return this.firestore
                        .collection('users')
                        .doc(userDoc.id)
                        .update({ savedUsers: updatedSavedUsers });
                })
            );
    }



}
