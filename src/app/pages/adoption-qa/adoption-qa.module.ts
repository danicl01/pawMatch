import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { AdoptionQA } from './adoption-qa.component'

const routes = [
  {
    path: '',
    component: AdoptionQA,
  },
]

@NgModule({
  declarations: [AdoptionQA],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [AdoptionQA],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdoptionQaModule {}
