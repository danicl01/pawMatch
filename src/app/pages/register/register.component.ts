import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})
export class Register {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Register - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Register - PawMatch',
      },
    ])
  }
}
