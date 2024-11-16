import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { OwnerProfile } from './owner-profile.component'

const routes = [
  {
    path: '',
    component: OwnerProfile,
  },
]

@NgModule({
  declarations: [OwnerProfile],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [OwnerProfile],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OwnerProfileModule {}
