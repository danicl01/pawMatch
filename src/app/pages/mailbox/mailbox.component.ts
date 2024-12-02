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
  chatDetails: {
    chatId: string;
    participantId: string;
    lastMessage: string;
    lastMessageDate: Date | null
  }[] = [];
  private _authState = inject(AuthStateService);
  private _fireService = inject(FirestoreService);
  private _chatService = inject(ChatService);

  private _activatedRoute = inject(ActivatedRoute);
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
      console.log('Selected User ID:', this.selectedId);
    });
  }

  async getUserId(): Promise<void> {
    const currentUser = await this._authState.currentUser;
    if (currentUser && currentUser.uid) {
      this._fireService.getDocIdFromUserId(currentUser.uid).subscribe(docId => {
        if (docId) {
          console.log("El auth es este: ", docId)
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
    this._chatService.getChatsByUserId(this.userId).subscribe(querySnapshot => {

      if (!querySnapshot.empty) {

        const chatDocs = querySnapshot.docs;
        this.chatDetails = [];

        chatDocs.forEach(doc => {
          const chatData = doc.data();
          const chatId = doc.id;
          const lastMessage = chatData.lastMessage;
          const lastMessageTimestamp = chatData.lastMessageTimestamp;

          let participants = chatData.participants;

          participants = participants.filter(participant => participant !== this.userId);

          this.chatDetails.push({
            chatId,
            participantId: participants[0],
            lastMessage,
            lastMessageDate: lastMessageTimestamp ? new Date(lastMessageTimestamp.seconds * 1000) : null,
          });
          console.log(this.chatDetails)
        });
      } else {
        console.log('No se encontraron chats para este usuario.');
      }
    });
  }

  onSelectParticipant(participantId: string) {
    this.selectedId = participantId;
    console.log('Selected Participant ID:', this.selectedId);
  }
}
