import {Component, EventEmitter, inject, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {ChatService, MessageCreate, Message} from "../../services/chat.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Timestamp } from '@angular/fire/firestore';
import {Observable} from "rxjs";
import {AuthStateService} from "../../auth/data-access/auth-state.service";
import {FirestoreService} from "../../services/firestore.service";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  private participantUser$: Observable<any>;
  chatId: string | null = null;
  messages: ({ senderId: string; message: string; timestamp: Date } | MessageCreate)[] = [];
  newMessage: string = '';
  userId: string | null = null;
  participantImage: string;
  participantName: string;
  @Input() receiverId: string | null = null;
  @Output() chatCreated = new EventEmitter<void>();
  private _authState = inject(AuthStateService);
  private _fireService = inject(FirestoreService);
  private _chatService = inject(ChatService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _userService = inject(UserService);


  constructor() {}

  async ngOnInit(): Promise<void> {
    this._activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });
    await this.getUserId();
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.receiverId && changes.receiverId.currentValue) {
      this.startChat();
      this.loadData();
    }
  }

  async getUserId(): Promise<void> {
    const currentUser = await this._authState.currentUser;
    if (currentUser && currentUser.uid) {
      this._fireService.getDocIdFromUserId(currentUser.uid).subscribe(docId => {
        if (docId) {
          this.userId = docId;
          this.startChat();
        } else {
          console.error('chat/getUserId --- No se encontró docId para este userId');
        }
      });
    } else {
      console.error('No hay usuario autenticado');
    }
  }

  async sendMessage() {
    if (this.newMessage.trim()) {
      if (!this.chatId) {
        await this.createChatIfNeeded(this.receiverId);
      }
      const message: MessageCreate = {
        senderId: this.userId,
        message: this.newMessage,
        timestamp: Timestamp.fromDate(new Date()),
      };
      await this._chatService.sendMessage(this.chatId, message);
      this.newMessage = '';
    }
  }

  async startChat() {
    if (!this.receiverId || !this.userId) return;

    this._chatService.getChatIdByParticipants(this.userId, this.receiverId).subscribe(async chatId => {
      if (chatId) {
        this.chatId = chatId;
        this.loadMessages();
      } else {
        this.chatId = await this._chatService.createChat(this.userId!, this.receiverId!);
        this.chatCreated.emit();
      }
    });
  }

  loadMessages() {
    if (!this.chatId) return;

    this._chatService.getChatMessages(this.chatId).subscribe(messages => {
      this.messages = messages.map(message => {
        if (message.timestamp?.seconds) {
          return {
            ...message,
            timestamp: new Date(message.timestamp.seconds * 1000),
          };
        }
        return message;
      });
    });
  }

  async createChatIfNeeded(receiverId: string): Promise<void> {
    if (!this.chatId) {
      this.chatId = await this._chatService.createChat(this.userId, receiverId);
    }
    this._chatService.getChatMessages(this.chatId).subscribe((messages) => {
      this.messages = messages;
    });
    this.chatCreated.emit();
  }

  loadData() {
    if (this.receiverId) {
      this.participantUser$ = this._fireService.getUser(this.receiverId);
      this.participantUser$.subscribe(user => {
        this.participantName = user.profilePerson?.name || 'Not specified';
        this.participantImage = user.profilePerson?.picture || 'https://play.teleporthq.io/static/svg/default-img.svg';
      });
    }
  }

  navigateWithUserId() {
    this._userService.setRandomUserId(this.receiverId);
    this._router.navigate(['/user-owner-profile']);
  }
}