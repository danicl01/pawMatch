import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Mailbox } from './mailbox.component'

const routes = [
  {
    path: '',
    component: Mailbox,
  },
]

@NgModule({
  declarations: [Mailbox],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Mailbox],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MailboxModule {}
