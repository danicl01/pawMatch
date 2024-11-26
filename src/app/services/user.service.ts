import {inject, Injectable, signal} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {AuthStateService} from "../auth/data-access/auth-state.service";
import {catchError, tap, throwError} from "rxjs";

export interface User {
  id: string;
  city: string;
  country: string;
  address: string;
  profilePerson: ProfilePerson;
  profilePet: ProfilePet[];
}

export interface ProfilePerson {
  name: string;
  sex: string;
  age: number;
  job: string;
  schedule: string;
  description?: string;
  picture?: string;
}

export interface ProfilePet {
  name: string;
  sex: string;
  age: number;
  weight: number;
  size: number;
  species: string;
  breed: string;
  sexualStatus: string;
  diseases?: string;
  description?: string;
  picture?: string;
  search: string;
}



export type UserCreate = Omit<User, 'id'>;

const PATH = 'users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _firestore = inject(AngularFirestore);
  private _authState = inject(AuthStateService);

  private _collection: AngularFirestoreCollection<UserCreate>;
  private _query: AngularFirestoreCollection<UserCreate>;

  loading = signal<boolean>(true);

  constructor() {
    this.initializeQuery();
  }

  private async initializeQuery() {
    const currentUser = await this._authState.currentUser;
    if (currentUser) {
      this._query = this._firestore.collection<UserCreate>(PATH, (ref) =>
          ref.where('userId', '==', currentUser.uid)
      );
    } else {
      this._query = this._firestore.collection(PATH);
    }
  }

  getUsers() {
    return this._query.valueChanges({ idField: 'id' }).pipe(
        tap(() => {
          this.loading.set(false);
        }),
        catchError((error) => {
          this.loading.set(false);
          return throwError(() => error);
        })
    );
  }

  async createUser(user: UserCreate) {
    const currentUser = await this._authState.currentUser;
    if (!currentUser) {
      throw new Error('No user is authenticated');
    }
    const newUser = {
      ...user,
      userId: currentUser.uid,
    };
    return this._firestore.collection(PATH).add(newUser);
  }

  getUser(id: string) {
    const docRef = this._firestore.collection(PATH).doc(id);
    return docRef.get();
  }

  async update(user: Partial<User>, id: string) {
    const authUser = await this._authState.currentUser;
    if (!authUser) {
      throw new Error('No user is authenticated');
    }
    const updatedData = {
      ...user,
      userId: authUser.uid,
    };
    return this._firestore.collection(PATH).doc(id).update(updatedData);
  }

  // Collection references for nested profiles
  getProfilePersonCollection(userId: string) {
    return this._firestore.collection<ProfilePerson>(`${PATH}/${userId}/profile_person`);
  }

  getProfilePetCollection(userId: string) {
    return this._firestore.collection<ProfilePet>(`${PATH}/${userId}/profile_pet`);
  }

  // CRUD operations for ProfilePerson
  async createProfilePerson(userId: string, profilePerson: ProfilePerson) {
    const collectionRef = this.getProfilePersonCollection(userId);
    return collectionRef.add(profilePerson);
  }

  getProfilePersons(userId: string) {
    return this.getProfilePersonCollection(userId).valueChanges({ idField: 'id' });
  }

  async updateProfilePerson(userId: string, profileId: string, data: Partial<ProfilePerson>) {
    const docRef = this.getProfilePersonCollection(userId).doc(profileId);
    return docRef.update(data);
  }

  // CRUD operations for ProfilePet
  async createProfilePet(userId: string, profilePet: ProfilePet) {
    const collectionRef = this.getProfilePetCollection(userId);
    return collectionRef.add(profilePet);
  }

  getProfilePets(userId: string) {
    return this.getProfilePetCollection(userId).valueChanges({ idField: 'id' });
  }

  async updateProfilePet(userId: string, profileId: string, data: Partial<ProfilePet>) {
    const docRef = this.getProfilePetCollection(userId).doc(profileId);
    return docRef.update(data);
  }
}