import {Component, inject} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class Login {
  raw03d3: string = ' '
  email: string = '';
  password: string = '';
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'PawMatch',
      },
    ])
  }
}
