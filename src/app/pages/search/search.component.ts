import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
})
export class Search {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Search - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Search - PawMatch',
      },
    ])
  }
}
