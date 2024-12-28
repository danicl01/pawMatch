import {inject, Injectable} from '@angular/core';
import {FirestoreService} from "./firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _fireStore = inject(AngularFirestore);

  async addNotificationToUser(userId: string, notification: string): Promise<void> {
    return this._fireStore.collection('users').doc(userId).update({ notification: notification });
  }

  async clearUserNotification(userId: string): Promise<void> {
    return this._fireStore.collection('users').doc(userId).update({ notification: '' });
  }

  getNotification(userId: string){
    return this._fireStore.collection('users').doc(userId).valueChanges().pipe(
        map((userData: any) => userData?.notification || null)
    );
  }
}
