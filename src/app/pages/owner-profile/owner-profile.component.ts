import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'owner-profile',
  templateUrl: 'owner-profile.component.html',
  styleUrls: ['owner-profile.component.css'],
})
export class OwnerProfile {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Owner-Profile - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Owner-Profile - PawMatch',
      },
    ])
  }
}
