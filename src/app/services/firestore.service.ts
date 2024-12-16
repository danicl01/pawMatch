import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap} from 'rxjs';

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

  getDocIdFromUserId(userId: string): Observable<string | null> {
      return this.firestore.collection('users', ref => ref
          .where('userId', '==', userId)
      ).get().pipe(
      map((querySnapshot) => {
        if (querySnapshot.empty) return null;

        return querySnapshot.docs[0].id;
      })
      );
  }

  getDataFromCurrentAuthUser(userId: string): Observable<any> {
    return this.firestore.collection('users', ref => ref.where('userId', '==', userId))
        .valueChanges()
        .pipe(
            map(users => users[0])
        );
  }

  getUserDataById(userId: string): Promise<any | null> {
    return this.firestore.collection('users').doc(userId).get().toPromise()
        .then(doc => doc.exists ? doc.data() : null);
  }


    getPets(userId: string): Observable<any[]> {
    return this.firestore.collection('users').doc(userId).valueChanges().pipe(
        map((userData: any) => userData?.profilePet || []) //
    );
  }

  getPerson(userId: string): Observable<any> {
      return this.firestore.collection('users').doc(userId).valueChanges().pipe(
          map((userData: any | undefined) => userData?.profilePerson || null)
      );
  }

  async getRandomUsers(visitedProfiles: string[]): Promise<string[] | null> {
    const usersSnapshot = await this.firestore.collection('users').get().toPromise();
    if (usersSnapshot.empty) return null;

    let availableUsers = usersSnapshot.docs.filter(doc => !visitedProfiles.includes(doc.id));
    if (availableUsers.length === 0) return null;

    const randomUsers = [];
    while (randomUsers.length < 5 && availableUsers.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableUsers.length);
        randomUsers.push(availableUsers[randomIndex].id);
        availableUsers.splice(randomIndex, 1);
    }
    return randomUsers;
  }

    addToSavedUsers(userId: string, selectedUserId: string): Observable<void> {
        return this.firestore.collection('users', ref => ref.where('userId', '==', userId))
            .get()
            .pipe(
                switchMap(querySnapshot => {
                    if (querySnapshot.empty) throw new Error(`No user found with userId ${userId}`);

                    const userDoc = querySnapshot.docs[0];
                    const userData: any = userDoc.data();
                    const savedUsers: string[] = userData.savedUsers || [];
                    if (savedUsers.includes(selectedUserId)) return of();

                    const updatedSavedUsers = [...savedUsers, selectedUserId];
                    return this.firestore.collection('users').doc(userDoc.id).update({ savedUsers: updatedSavedUsers });
                })
            );
    }

    async updateSavedUser(userId: string, savedUsers: string[]): Promise<void> {
        const userRef = this.firestore.collection('users', ref => ref.where('userId', '==', userId));
        const userSnapshot = await userRef.get().toPromise();

        if (!userSnapshot.empty) {
            const docId = userSnapshot.docs[0].id;
            await this.firestore.collection('users').doc(docId).update({ savedUsers });
        } else throw new Error('Usuario no encontrado.');

    }
}
