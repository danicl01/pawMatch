import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { Header } from './header/header.component'
import { PetComponent } from './pet-component/pet-component.component'
import { OwnerComponent } from './owner-component/owner-component.component'
import {SavedUserComponent} from "./saved-user/saved-user.component";
import {ChatComponent} from "./chat/chat.component";
import {FormsModule} from "@angular/forms";
import {ChatListComponent} from "./chat-list/chat-list.component";

@NgModule({
  declarations: [Header, PetComponent, OwnerComponent, SavedUserComponent, ChatComponent, ChatListComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [Header, PetComponent, OwnerComponent, SavedUserComponent, ChatComponent, ChatListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
