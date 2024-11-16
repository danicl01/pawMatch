import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Map } from './map.component'

const routes = [
  {
    path: '',
    component: Map,
  },
]

@NgModule({
  declarations: [Map],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Map],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapModule {}
