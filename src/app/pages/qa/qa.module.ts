import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { QA } from './qa.component'

const routes = [
  {
    path: '',
    component: QA,
  },
]

@NgModule({
  declarations: [QA],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [QA],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class QaModule {}
