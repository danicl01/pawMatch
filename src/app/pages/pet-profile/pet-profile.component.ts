import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'pet-profile',
  templateUrl: 'pet-profile.component.html',
  styleUrls: ['pet-profile.component.css'],
})
export class PetProfile {
  raw1b3g: string = ' '
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Pet-Profile - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Pet-Profile - PawMatch',
      },
    ])
  }
}
