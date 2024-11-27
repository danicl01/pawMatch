import {Component, Input, ContentChild, TemplateRef, inject} from '@angular/core'
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'pet-component',
  templateUrl: 'pet-component.component.html',
  styleUrls: ['pet-component.component.css'],
})
export class PetComponent {
  @Input() name: string = '';
  @Input() breed: string = '';
  @Input() age: string = '';
  @Input() weight: string = '';
  @Input() size: string = '';
  @Input() search: string = '';
  @Input() userId: string | null = null;

  @ContentChild('text8')
  text8: TemplateRef<any>
  @ContentChild('text')
  text: TemplateRef<any>
  @Input()
  imageSrc1: string = 'https://play.teleporthq.io/static/svg/default-img.svg'
  @ContentChild('text9')
  text9: TemplateRef<any>
  @Input()
  imageAlt1: string = 'image'
  @Input()
  imageAlt4: string = 'image'
  @ContentChild('text2')
  text2: TemplateRef<any>
  @ContentChild('text1')
  text1: TemplateRef<any>
  @Input()
  imageAlt3: string = 'image'
  @ContentChild('text4')
  text4: TemplateRef<any>
  @Input()
  imageSrc3: string = '/assets/female-200h.png'
  @ContentChild('text7')
  text7: TemplateRef<any>
  @ContentChild('text5')
  text5: TemplateRef<any>
  @Input()
  rootClassName: string = ''
  @ContentChild('text6')
  text6: TemplateRef<any>
  @ContentChild('text3')
  text3: TemplateRef<any>
  @Input()
  imageSrc4: string = '/assets/like%20(1)-200h.png'
  rawiihl: string = ' '
  rawf2i2: string = ' '

  _userService = inject(UserService);
  _router = inject(Router);
  constructor() {}

  navigateWithUserId() {
    this._userService.setRandomUserId(this.userId);
    this._router.navigate(['/user-pet-profile']);
  }
}
