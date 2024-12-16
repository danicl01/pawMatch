import {Component, Input, ContentChild, TemplateRef, inject, SimpleChanges} from '@angular/core'
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FirestoreService} from "../../services/firestore.service";

@Component({
  selector: 'owner-component',
  templateUrl: 'owner-component.component.html',
  styleUrls: ['owner-component.component.css'],
})
export class OwnerComponent {
  @Input() name: string = '';
  @Input() age: string = '';
  @Input() sex: string = '';
  @Input() job: string = '';
  @Input() size: string = '';
  @Input() search: string = '';
  @Input() city: string = '';
  @Input() country: string = '';
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

  _userService = inject(UserService);
  _router = inject(Router);
  private _fireService = inject(FirestoreService);
  constructor() {}

  ngOnInit() {
    this.loadData(this.userId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      this.loadData(this.userId);
    }
  }

   loadData(userId: string) {
    if (this.userId) {
      const user$ = this._fireService.getUser(this.userId);
      user$.subscribe(user => {
        this.name = user.profilePerson?.name || 'Not specified';
        this.sex = user.profilePerson?.sex || 'Not specified';
        this.age = user.profilePerson?.age || 'Not specified';
        this.job = user.profilePerson?.job || 'Not specified';
        this.imageSrc1 = user.profilePerson?.picture || 'https://play.teleporthq.io/static/svg/default-img.svg';
      });
    }
  }

  navigateWithUserId() {
    this._userService.setRandomUserId(this.userId);
    this._router.navigate(['/user-owner-profile']);
  }
}
