import {Component, inject} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {hasEmailError, isRequired} from "../../auth/utils/validators";
import {AuthService} from "../../auth/auth.service";
import {toast} from "ngx-sonner";


interface FormRegister {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})
export class Register {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  isEmailRequired() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormRegister>({
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
        content: 'Register - PawMatch',
      },
    ])
  }

  async register() {
    if (this.form.invalid) return;

    try {
      const { email, password} = this.form.value;
      if (!email || !password) return;
      console.log({email, password});
      await this._authService.registerNewUser({email, password});
      toast.success("User created succesfully!");
    } catch (error) {
      toast.error("Something was wrong with the registration");
    }
  }
}
