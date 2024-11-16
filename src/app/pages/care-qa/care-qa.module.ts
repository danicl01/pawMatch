import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { CareQA } from './care-qa.component'

const routes = [
  {
    path: '',
    component: CareQA,
  },
]

@NgModule({
  declarations: [CareQA],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [CareQA],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CareQaModule {}
