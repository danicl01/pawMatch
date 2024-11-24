import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Form } from './form.component'
import {ReactiveFormsModule} from "@angular/forms";

const routes = [
  {
    path: '',
    component: Form,
  },
]

@NgModule({
  declarations: [Form],
  imports: [CommonModule, ComponentsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [Form],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormModule {}
