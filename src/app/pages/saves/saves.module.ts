import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Saves } from './saves.component'

const routes = [
  {
    path: '',
    component: Saves,
  },
]

@NgModule({
  declarations: [Saves],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Saves],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SavesModule {}
