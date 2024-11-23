import {Component, inject} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {hasEmailError, isRequired} from "../../auth/utils/validators";
import {toast} from "ngx-sonner";

export interface FormLogin {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class Login {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  isEmailRequired() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormLogin>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', Validators.required),
  });
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Register - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Login - PawMatch',
      },
    ])
  }

  async login() {
    if (this.form.invalid) return;

    try {
      const { email, password} = this.form.value;
      if (!email || !password) return;
      console.log({email, password});
      await this._authService.loginExistingUser({email, password});
      toast.success("Welcome back!");
      await this._router.navigate(['/home']);
    } catch (error) {
      toast.error("Something was wrong with the logging");
    }
  }
}
