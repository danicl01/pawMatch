import {Component, inject} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { AuthService } from '../../auth/auth.service';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['login.component.css'],
})
export default class Login {

  private _formBuilder = inject(FormBuilder);
  raw03d3: string = ' '
  email: string = '';
  password: string = '';
  constructor(private title: Title, private meta: Meta, private authService: AuthService) {
    this.title.setTitle('PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'PawMatch',
      },
    ])
  }

  login() {
    if (this.email && this.password) {
      console.log('Login attempted with', this.email, this.password);
      this.authService.login(this.email, this.password)
          .then(res => {
            console.log('Inicio de sesión exitoso:', res);
          })
          .catch(err => {
            console.error('Error al iniciar sesión:', err.message);
          });
    } else {
      console.log('Please fill in all fields');
    }
  }
}
