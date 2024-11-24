import {inject, Injectable} from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {getAuth} from "@angular/fire/auth";

@Injectable({
    providedIn: 'root',
})
export class AuthStateService {
    private _auth = inject(AngularFireAuth);

    get authState$() {
        return this._auth.authState;
    }

    get currentUser() {
        return getAuth().currentUser;
    }

    logout(): Promise<void> {
        return this._auth.signOut();
    }
}
