import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-saves',
  templateUrl: 'saves.component.html',
  styleUrls: ['saves.component.css'],
})
export class Saves {
  rawa76r: string = ' '
  rawewy0: string = ' '
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Saves - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Saves - PawMatch',
      },
    ])
  }
}
