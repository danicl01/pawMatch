import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { UserPetProfile } from './user-pet-profile.component'

const routes = [
  {
    path: '',
    component: UserPetProfile,
  },
]

@NgModule({
  declarations: [UserPetProfile],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [UserPetProfile],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserPetProfileModule {}
