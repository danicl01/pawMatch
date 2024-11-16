import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
})
export class Form {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Form - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Form - PawMatch',
      },
    ])
  }
}
