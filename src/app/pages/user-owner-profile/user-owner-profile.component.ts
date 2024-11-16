import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'user-owner-profile',
  templateUrl: 'user-owner-profile.component.html',
  styleUrls: ['user-owner-profile.component.css'],
})
export class UserOwnerProfile {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('User-owner-Profile - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'User-owner-Profile - PawMatch',
      },
    ])
  }
}
