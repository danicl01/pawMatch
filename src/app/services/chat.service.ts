import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {}

  async createChat(user1Id: string, user2Id: string) {
    const chatId = this.getChatId(user1Id, user2Id);

    const chatRef = this.firestore.collection('chats').doc(chatId);

    const doc = await chatRef.get().toPromise();
    if (!doc.exists) {
      await chatRef.set({
        participants: {
          [user1Id]: { name: 'User 1', email: 'user1@example.com' },
          [user2Id]: { name: 'User 2', email: 'user2@example.com' }
        }
      });
    }
  }

  getChatId(user1Id: string, user2Id: string): string {
    return user1Id < user2Id ? `${user1Id}-${user2Id}` : `${user2Id}-${user1Id}`;
  }

  sendMessage(userId: string, chatId: string, message: string): void {
    const timestamp = new Date();
    this.firestore.collection('chats').doc(chatId).collection('messages').add({
      senderId: userId,
      message: message,
      timestamp: timestamp
    });
  }

  getMessages(chatId: string): Observable<any[]> {
    return this.firestore.collection('chats').doc(chatId).collection('messages', ref =>
        ref.orderBy('timestamp')).valueChanges();
  }
}
