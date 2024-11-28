import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { Header } from './header/header.component'
import { PetComponent } from './pet-component/pet-component.component'
import { OwnerComponent } from './owner-component/owner-component.component'
import {SavedUserComponent} from "./saved-user/saved-user.component";

@NgModule({
  declarations: [Header, PetComponent, OwnerComponent, SavedUserComponent],
  imports: [CommonModule, RouterModule],
  exports: [Header, PetComponent, OwnerComponent, SavedUserComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
