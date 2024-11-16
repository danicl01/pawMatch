import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Search } from './search.component'

const routes = [
  {
    path: '',
    component: Search,
  },
]

@NgModule({
  declarations: [Search],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Search],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchModule {}
