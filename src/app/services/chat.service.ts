import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Timestamp } from '@angular/fire/firestore';
import {map, Observable} from "rxjs";

const CHAT_PATH = 'chats';

export interface Chat {
  id: string;
  lastMessage: string;
  lastMessageTimestamp: firebase.firestore.Timestamp | null;
  lastMessageSender: string;
  participants: string[];
  state: 'read' | 'unread';
}

export interface ChatCreate extends Omit<Chat, 'id'> {}

export interface Message {
  id: string;
  senderId: string;
  message: string;
  timestamp: firebase.firestore.Timestamp;
}

export interface MessageCreate extends Omit<Message, 'id'> {}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _firestore = inject(AngularFirestore);
  private _chatCollection: AngularFirestoreCollection<ChatCreate>;

  constructor() {
    this._chatCollection = this._firestore.collection<ChatCreate>(CHAT_PATH);
  }

  getChatIdByParticipants(userId: string, receiverId: string): Observable<string | null> {
    return this._firestore.collection(CHAT_PATH, ref =>
        ref.where('participants', 'array-contains', userId)
    ).snapshotChanges().pipe(
        map(actions => {
          const chatDoc = actions.find(action => {
            const data = action.payload.doc.data() as Chat;
            return data.participants.includes(receiverId);
          });
          return chatDoc ? chatDoc.payload.doc.id : null;
        })
    );
  }


  async createChat(userId: string, receiverId: string): Promise<string> {
    const newChat = await this._chatCollection.add({
      lastMessage: '',
      lastMessageTimestamp: null,
      lastMessageSender: '',
      participants: [userId, receiverId],
      state: 'unread',
    });
    return newChat.id;
  }


  getChatMessages(chatId: string) {
    return this._firestore
        .collection<MessageCreate>(`${CHAT_PATH}/${chatId}/messages`, (ref) =>
            ref.orderBy('timestamp', 'asc')
        )
        .valueChanges({ idField: 'id' });
  }

  async sendMessage(chatId: string, message: MessageCreate) {
    try {
      const messageRef = await this._firestore
          .collection<MessageCreate>(`${CHAT_PATH}/${chatId}/messages`)
          .add(message);
      await this._firestore.collection<ChatCreate>(CHAT_PATH).doc(chatId).update({
        lastMessage: message.message,
        lastMessageTimestamp: message.timestamp,
        lastMessageSender: message.senderId,
        state: 'unread',
      });
      return messageRef;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Could not send the message. Please try again later.');
    }
  }

  async markMessageAsRead(chatId: string, senderId: string) {
    try {
      const chatDoc = await this._firestore.collection<ChatCreate>(CHAT_PATH).doc(chatId).get().toPromise();

      if (chatDoc.exists) {
        const chatData = chatDoc.data();
        if (chatData && chatData.lastMessageSender !== senderId) {
          await this._firestore.collection<ChatCreate>(CHAT_PATH).doc(chatId).update({
            state: 'read',
          });
        }
      }
    } catch (error) {
      console.error('Error al marcar el mensaje como leído:', error);
    }
  }

  getChatsByUserId(userId: string): Observable<Chat[]> {
    return this._firestore
        .collection<Chat>(CHAT_PATH, ref => ref.where('participants', 'array-contains', userId))
        .valueChanges({ idField: 'id' });
  }

}
