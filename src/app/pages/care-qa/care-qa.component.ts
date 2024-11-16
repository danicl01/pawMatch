import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'care-qa',
  templateUrl: 'care-qa.component.html',
  styleUrls: ['care-qa.component.css'],
})
export class CareQA {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Care-QA - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Care-QA - PawMatch',
      },
    ])
  }
}
