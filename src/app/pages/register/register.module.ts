import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Register } from './register.component'
import {ReactiveFormsModule} from "@angular/forms";

const routes = [
  {
    path: '',
    component: Register,
  },
]

@NgModule({
  declarations: [Register],
  imports: [CommonModule, ComponentsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [Register],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterModule {}
