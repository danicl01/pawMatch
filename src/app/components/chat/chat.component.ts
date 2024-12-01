import {Component, inject, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentUserId: string;
  chatId: string;
  messages: any[] = [];
  message = '';
  chatPartnerId = 'user2Id';

  _chatService = inject(ChatService);
  _authService = inject(AngularFireAuth);

  constructor() {}

  ngOnInit(): void {
    this._authService.currentUser.then(user => {
      this.currentUserId = user?.uid!;
      this.chatId = this._chatService.getChatId(this.currentUserId, this.chatPartnerId);

      this._chatService.getMessages(this.chatId).subscribe(messages => {
        this.messages = messages;
      });
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this._chatService.sendMessage(this.currentUserId, this.chatId, this.message);
      this.message = '';
    }
  }
}
