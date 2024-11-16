import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-qa',
  templateUrl: 'qa.component.html',
  styleUrls: ['qa.component.css'],
})
export class QA {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('QA - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'QA - PawMatch',
      },
    ])
  }
}
