import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { Header } from './header/header.component'
import { PetComponent } from './pet-component/pet-component.component'
import { OwnerComponent } from './owner-component/owner-component.component'

@NgModule({
  declarations: [Header, PetComponent, OwnerComponent],
  imports: [CommonModule, RouterModule],
  exports: [Header, PetComponent, OwnerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
