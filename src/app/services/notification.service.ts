import {inject, Injectable} from '@angular/core';
import {FirestoreService} from "./firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _fireStore = inject(AngularFirestore);

  constructor() { }



  async addNotificationToUser(userId: string, notification: string): Promise<void> {
    console.log("Vamos a crear el chat");
    return this._fireStore.collection('users').doc(userId).update({ notification: notification });
  }


  async clearUserNotification(userId: string): Promise<void> {
    try {
      const userDocRef = this._fireStore.collection('users').doc(userId);
      await userDocRef.update({ notification: null });
      console.log('Notification cleared.');
    } catch (error) {
      console.error('Error clearing notification:', error);
    }
  }

}
