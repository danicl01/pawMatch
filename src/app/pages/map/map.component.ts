import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
})
export class Map {
  rawbgbu: string = ' '
  rawjj14: string = ' '
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Map - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Map - PawMatch',
      },
    ])
  }
}
