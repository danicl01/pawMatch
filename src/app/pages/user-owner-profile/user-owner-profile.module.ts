import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { UserOwnerProfile } from './user-owner-profile.component'

const routes = [
  {
    path: '',
    component: UserOwnerProfile,
  },
]

@NgModule({
  declarations: [UserOwnerProfile],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [UserOwnerProfile],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserOwnerProfileModule {}
