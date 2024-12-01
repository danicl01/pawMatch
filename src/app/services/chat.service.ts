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
}

export interface ChatCreate extends Omit<Chat, 'id'> {}

export interface Message {
  id: string;
  senderId: string;
  message: string;
  timestamp: firebase.firestore.Timestamp;
  state: 'read' | 'unread' | 'request';
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

  getChatIdByParticipants(userId: string, receiverId: string) {
    return this._firestore.collection('chats', ref => ref
        .where('participants', 'array-contains', userId)
    )
        .get()
        .pipe(
            map((querySnapshot) => {
              if (querySnapshot.empty) {
                return null;
              }
              const chatDoc = querySnapshot.docs.find(doc => {
                const data = doc.data() as Chat;
                const participants = data.participants;
                return participants.includes(receiverId);
              });
              return chatDoc ? chatDoc.id : null;
            })
        );
  }

  chatExists(chatId: string): Promise<boolean> {
    return this._firestore
        .collection('chats')
        .doc(chatId)
        .get()
        .toPromise()
        .then((doc) => doc.exists);
  }

  async createChat(userId: string, receiverId: string): Promise<string> {
    const newChatRef = await this._firestore.firestore.collection('chats').add({
      lastMessage: '',
      lastMessageTimestamp: null,
      lastMessageSender: '',
      participants: [userId, receiverId],
      createdAt: Timestamp.fromDate(new Date()),
    });

    return newChatRef.id;
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
      return await this._firestore
          .collection<MessageCreate>(`${CHAT_PATH}/${chatId}/messages`)
          .add(message);
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Could not send the message. Please try again later.');
    }
  }

  async markMessageAsRead(chatId: string, messageId: string) {
    return this._firestore
        .collection(`${CHAT_PATH}/${chatId}/messages`)
        .doc(messageId)
        .update({ state: 'read' });
  }
}
