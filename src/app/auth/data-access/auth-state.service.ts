import {inject, Injectable} from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthStateService {
    private _auth = inject(AngularFireAuth);

    get authState$() {
        return this._auth.authState;
    }

    get currentUser() {
        return this._auth.currentUser;
    }

    logout(): Promise<void> {
        return this._auth.signOut();
    }
}
