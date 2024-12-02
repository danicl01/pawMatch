import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FirestoreService} from "../../services/firestore.service";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";


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
  @Output() selectParticipant = new EventEmitter<string>();

  user$: Observable<any> | undefined;
  ownerName: string = ' ';
  ownerImage: string = ' ';
  formattedDate: string;

  private _firestore = inject(FirestoreService);

  async ngOnInit(): Promise<void> {

    if (this.participantId) {
      this.user$ = this._firestore.getUser(this.participantId);
      this.user$.subscribe(user => {
        this.ownerName = user.profilePerson?.name || 'Not specified';
        this.ownerImage = user.profilePerson?.picture || 'https://play.teleporthq.io/static/svg/default-img.svg';
      });
    }
    if (this.lastMessageDate) {
      const date = new Date(this.lastMessageDate);
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
      };
      this.formattedDate = date.toLocaleDateString('es-ES', options);
    } else {
      this.formattedDate = 'Fecha no disponible';
    }
  }

  onSelectParticipant() {
    this.selectParticipant.emit(this.participantId);
  }
}
