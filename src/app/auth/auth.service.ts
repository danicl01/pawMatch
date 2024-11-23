import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  registerNewUser(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
    );
  }
}
