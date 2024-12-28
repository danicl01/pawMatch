import {Component, inject, OnInit} from '@angular/core';
import {AuthStateService} from "../../auth/data-access/auth-state.service";
import {FirestoreService} from "../../services/firestore.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notification: string | null = null;
  userAuthId: string | null = null;
  userAuthDocId: string | null = null;

  private _authState = inject(AuthStateService);
  private _notificationService = inject(NotificationService);
  private firestoreService = inject(FirestoreService);
  private _route = inject(Router);

  async ngOnInit(): Promise<void> {
    await this.getAuthenticatedUserId();
  }

  async getAuthenticatedUserId(): Promise<void> {
    const currentUser = await this._authState.currentUser;
    if (currentUser && currentUser.uid) {
      this.userAuthId = currentUser.uid;
      this.firestoreService.getDocIdFromUserId(currentUser.uid).subscribe(docId => {
        if (docId) {
          this.userAuthDocId = docId;
          this.getNotification()
        } else {
          console.error('No docId founded for this userId.');
        }
      });
    } else {
      console.error('There is not auth user.');
    }
  }

  getNotification(): void {
    if (this.userAuthDocId) {
      this._notificationService.getNotification(this.userAuthDocId).subscribe({
        next: (notification) => {
          this.notification = notification || 'You don´t have new notifications.';
        },
        error: (err) => {
          console.error('Error fetching notification:', err);
          this.notification = 'Error al obtener la notificación.';
        }
      });
    } else {
      console.error('User ID is not available for fetching notification.');
    }
  }

  goToMailbox() {
    this.notification = null;
    if (this.userAuthDocId) {
      this._notificationService.clearUserNotification(this.userAuthDocId);
    } else {
      console.error('User ID is not available for fetching notification.');
    }
    this._route.navigate(['/mailbox']);
  }
}
