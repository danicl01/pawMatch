import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FirestoreService} from "../../services/firestore.service";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";
import {ChatService} from "../../services/chat.service";


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
  @Input() chatId: string;
  @Input() participantId: string;
  @Input() lastMessage: string;
  @Input() lastMessageDate: Date | null;
  @Input() authUser: string;
  @Output() selectParticipant = new EventEmitter<string>();

  user$: Observable<any> | undefined;
  ownerName: string = ' ';
  ownerImage: string = ' ';
  formattedDate: string;

  private _firestore = inject(FirestoreService);
  private _chatService = inject(ChatService);

  ngOnInit(): void {
    if (this.participantId) {
      this.user$ = this._firestore.getUser(this.participantId);
      this.user$.subscribe(user => {
        this.ownerName = user.profilePerson?.name || 'Not specified';
        this.ownerImage = user.profilePerson?.picture || 'https://play.teleporthq.io/static/svg/default-img.svg';
      });
    }

    this.formattedDate = this.lastMessageDate
        ? new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(new Date(this.lastMessageDate))
        : 'Fecha no disponible';
  }


  async  onSelectParticipant() {
    this.selectParticipant.emit(this.participantId);
    try {
      if (this.chatId && this.authUser) {
        await this._chatService.markMessageAsRead(this.chatId, this.authUser);
        console.log(`Chat ${this.chatId} marcado como leído.`);
      }
    } catch (error) {
      console.error('Error al marcar el mensaje como leído:', error);
    }
  }
}
