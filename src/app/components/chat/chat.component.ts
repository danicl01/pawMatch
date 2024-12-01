import {Component, inject, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {ChatService, MessageCreate, Message} from "../../services/chat.service";
import {ActivatedRoute} from "@angular/router";
import { Timestamp } from '@angular/fire/firestore';
import {Observable} from "rxjs";
import {AuthStateService} from "../../auth/data-access/auth-state.service";
import {FirestoreService} from "../../services/firestore.service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  user$: Observable<any> | undefined;
  chatId: string | null = null;
  messages: Message[] = [];
  newMessage: string = '';
  userId: string | null = null;
  private _authState = inject(AuthStateService);
  private _fireService = inject(FirestoreService);
  private _chatService = inject(ChatService);
  private _activatedRoute = inject(ActivatedRoute);

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.getUserId();


  }

  async getUserId(): Promise<void> {
    const currentUser = await this._authState.currentUser;
    if (currentUser && currentUser.uid) {
      this._fireService.getDocIdFromUserId(currentUser.uid).subscribe(docId => {
        if (docId) {
          console.log("El auth es este: ", docId)
          this.userId = docId;
          this.startChat();
        } else {
          console.error('No se encontró docId para este userId');
        }
      });
    } else {
      console.error('No hay usuario autenticado');
    }
  }

  async sendMessage() {
    if (this.newMessage.trim()) {
      if (!this.chatId) {
        const receiverId = 'KQJaf9YHBk3oWqqhJLEu';
        await this.createChatIfNeeded(receiverId);
      }
      const message: MessageCreate = {
        senderId: this.userId,
        message: this.newMessage,
        timestamp: Timestamp.fromDate(new Date()),
        state: 'unread',
      };
      await this._chatService.sendMessage(this.chatId, message);
      this.newMessage = '';
    }
  }

  async startChat() {
    const receiverId = 'KQJaf9YHBk3oWqqhJLEu';

    this._chatService.getChatIdByParticipants(this.userId, receiverId).subscribe(docId => {
      if (docId) {
        console.log('DocId encontrado:', docId);
        this.chatId = docId;

        this._chatService.getChatMessages(this.chatId).subscribe((messages) => {
          this.messages = messages;
          console.log('Mensajes obtenidos:', messages);
        });
      } else {
        console.error('No se encontró docId para este userId');
      }
    });
  }


  async createChatIfNeeded(receiverId: string) {
    console.log("Creando chat...");
    this.chatId = await this._chatService.createChat(this.userId, receiverId);
    console.log("Nuevo chat creado con ID:", this.chatId);
  }
}