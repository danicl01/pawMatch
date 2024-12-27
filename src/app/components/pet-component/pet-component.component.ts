import {Component, Input, ContentChild, TemplateRef, inject, SimpleChanges} from '@angular/core'
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FirestoreService} from "../../services/firestore.service";

@Component({
  selector: 'pet-component',
  templateUrl: 'pet-component.component.html',
  styleUrls: ['pet-component.component.css'],
})
export class PetComponent {
  @Input() name: string = '';
  @Input() sex: string = '';
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
  @Input()
  imageAlt5: string = 'image'
  @Input()
  imageSrc5: string = '/assets/male-200h.png'
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
    console.log("Usuario recibido", this.userId)
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
        this.name = user.profilePet[0]?.name || 'Not specified';
        this.sex = user.profilePet[0]?.sex || 'Not specified';
        this.breed = user.profilePet[0]?.breed || 'Not specified';
        this.age = user.profilePet[0]?.age || 'Not specified';
        this.weight = user.profilePet[0]?.weight || 'Not specified';
        this.size = user.profilePet[0]?.size || 'Not specified';
        this.imageSrc1 = user.profilePet[0]?.picture || 'https://play.teleporthq.io/static/svg/default-img.svg';
      });
    }
  }

  navigateWithUserId() {
    this._userService.setRandomUserId(this.userId);
    this._router.navigate(['/user-pet-profile']);
  }
}
