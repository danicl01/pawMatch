import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'user-pet-profile',
  templateUrl: 'user-pet-profile.component.html',
  styleUrls: ['user-pet-profile.component.css'],
})
export class UserPetProfile {
  rawvf7p: string = ' '
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('User-pet-Profile - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'User-pet-Profile - PawMatch',
      },
    ])
  }
}
