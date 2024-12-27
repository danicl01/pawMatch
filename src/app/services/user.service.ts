import {inject, Injectable, signal} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {AuthStateService} from "../auth/data-access/auth-state.service";

export interface User {
  id: string;
  city: string;
  country: string;
  address: string;
  latitude: string;
  longitude: string;
  profilePerson: ProfilePerson;
  profilePet: ProfilePet[];
  savedUsers: string[];
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
  private _query: AngularFirestoreCollection<UserCreate>;

  private randomUserId: string | null = null;

  loading = signal<boolean>(true);

  constructor() {
    this.initializeQuery();
  }

  setRandomUserId(id: string) {
    this.randomUserId = id;
  }

  getRandomUserId(): string | null {
    return this.randomUserId;
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
}