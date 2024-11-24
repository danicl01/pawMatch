import {Component, inject, signal} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {FormBuilder, Validators} from "@angular/forms";
import {UserCreate, UserService} from "../../services/user.service";
import {toast} from "ngx-sonner";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
})
export class Form {
  private _formBuilder = inject(FormBuilder);
  private _userService = inject(UserService);
  private _router = inject(Router);

  loading = signal(false);

  form = this._formBuilder.group({
    firstName: this._formBuilder.control('', Validators.required),
    lastName: this._formBuilder.control('', Validators.required),

  })

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Form - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Form - PawMatch',
      },
    ])
  }

  async submit() {
    if(this.form.invalid) return;
    try {
      this.loading.set(true);
      const {firstName, lastName} = this.form.value;
      const user: UserCreate = {
        firstName: firstName || '',
        lastName: lastName || '',
      };
      await this._userService.createUser(user);
      toast.success("User created successfully!");
      await this._router.navigate(['/home']);
    } catch (error) {
      toast.error("Error");
    } finally {
      this.loading.set(false);
    }
  }
}
