import {Component, inject, Input} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {ActivatedRoute, Router} from "@angular/router";
import {ChatService, Message} from "../../services/chat.service";
import {AuthStateService} from "../../auth/data-access/auth-state.service";
import {FirestoreService} from "../../services/firestore.service";

@Component({
  selector: 'app-mailbox',
  templateUrl: 'mailbox.component.html',
  styleUrls: ['mailbox.component.css'],
})
export class Mailbox {
  raw1ik8: string = ' '
  selectedId: string | null = null;
  userId: string | null = null;
  allChats: typeof this.chatDetails = [];
  chatDetails: {
    chatId: string;
    participantId: string;
    lastMessage: string;
    lastMessageDate: Date | null;
    lastMessageSender: string;
    state: string;
  }[] = [];
  private _authState = inject(AuthStateService);
  private _fireService = inject(FirestoreService);
  private _chatService = inject(ChatService);
  private _activatedRoute = inject(ActivatedRoute);

  selectedFilter: 'all' | 'unread' = 'all';

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Mailbox - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Mailbox - PawMatch',
      },
    ])
  }

  async ngOnInit(): Promise<void> {
    await this.getUserId();
    this._activatedRoute.queryParams.subscribe(params => {
      this.selectedId = params['selectedUserId'];
    });
  }

  async getUserId(): Promise<void> {
    const currentUser = await this._authState.currentUser;
    if (currentUser && currentUser.uid) {
      this._fireService.getDocIdFromUserId(currentUser.uid).subscribe(docId => {
        if (docId) {
          this.userId = docId;
          this.getChatsAndUsers();
        } else {
          console.error('No se encontró docId para este userId');
        }
      });
    } else {
      console.error('No hay usuario autenticado');
    }
  }

  getChatsAndUsers() {
    this._chatService.getChatsByUserId(this.userId).subscribe(chats => {
      this.allChats = chats.map(chat => {
        const participantId = chat.participants.find(p => p !== this.userId);
        return {
          chatId: chat.id,
          participantId,
          lastMessage: chat.lastMessage,
          lastMessageDate: chat.lastMessageTimestamp ? new Date(chat.lastMessageTimestamp.seconds * 1000) : null,
          lastMessageSender: chat.lastMessageSender,
          state: chat.state,
        };
      });
      this.chatDetails = this.allChats.sort((a, b) => {
        if (a.lastMessageDate && b.lastMessageDate) {
          return b.lastMessageDate.getTime() - a.lastMessageDate.getTime();
        }
        return 0;
      });
    });
  }


  filterChats() {
    if (this.selectedFilter === 'unread') {
      this.chatDetails = this.allChats.filter(chat =>
          chat.state === 'unread' && chat.lastMessageSender !== this.userId
      );
    } else {
      this.chatDetails = [...this.allChats];
    }
  }


  onFilterChange(filter: 'all' | 'unread') {
    this.selectedFilter = filter;
    this.filterChats();
  }

  onSelectParticipant(participantId: string) {
    this.selectedId = participantId;
  }

  onChatCreated() {
    this.getChatsAndUsers();
  }
}
