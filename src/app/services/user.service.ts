import { inject, Injectable, signal } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference,} from '@angular/fire/compat/firestore';


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

export type UserCreate = Omit<User, 'id'>;

const PATH = 'users';

@Injectable()
export class UserService {
  private _firestore = inject(AngularFirestore);

  private _collection: AngularFirestoreCollection<User> = this._firestore.collection<User>(PATH);
}
