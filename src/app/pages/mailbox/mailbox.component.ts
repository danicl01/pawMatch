import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-mailbox',
  templateUrl: 'mailbox.component.html',
  styleUrls: ['mailbox.component.css'],
})
export class Mailbox {
  raw1ik8: string = ' '
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Mailbox - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Mailbox - PawMatch',
      },
    ])
  }
}
