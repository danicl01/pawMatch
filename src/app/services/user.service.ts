import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {updateDoc} from "@angular/fire/firestore";


export interface User {
  id: string;
  firstName: string;
  lastName: string;
}
/*
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
  description: string;
  picture: string;
}

export interface ProfilePet {
  name: string;
  sex: string;
  age: number;
  weight: number;
  size: number;
  species: string;
  breed: string;
  sexStatus: string;
  diseases: string;
  description: string;
  picture: string;
  search: string;
}

 */

export type UserCreate = Omit<User, 'id'>;

const PATH = 'users';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private _firestore = inject(AngularFirestore);

  private _collection: AngularFirestoreCollection<UserCreate> = this._firestore.collection(PATH);

  createUser(user: UserCreate) {
    return this._collection.add(user);
  }

  getUser(id: string) {
    const docRef = this._collection.doc(id);
    return docRef.get();
  }

  update(user: Partial<User>, id: string) {
    const docRef = this._collection.doc(id);
    return docRef.update(user);
  }

}
