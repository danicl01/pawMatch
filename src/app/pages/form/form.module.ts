import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Form } from './form.component'

const routes = [
  {
    path: '',
    component: Form,
  },
]

@NgModule({
  declarations: [Form],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Form],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormModule {}
