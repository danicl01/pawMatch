import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'adoption-qa',
  templateUrl: 'adoption-qa.component.html',
  styleUrls: ['adoption-qa.component.css'],
})
export class AdoptionQA {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Adoption-QA - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Adoption-QA - PawMatch',
      },
    ])
  }
}
