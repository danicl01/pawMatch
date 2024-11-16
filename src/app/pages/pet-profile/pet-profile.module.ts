import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { PetProfile } from './pet-profile.component'

const routes = [
  {
    path: '',
    component: PetProfile,
  },
]

@NgModule({
  declarations: [PetProfile],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [PetProfile],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PetProfileModule {}
