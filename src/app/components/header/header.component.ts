import {Component, Input, ContentChild, TemplateRef, inject} from '@angular/core'
import {Router} from "@angular/router";
import {AuthStateService} from "../../auth/data-access/auth-state.service";
import {toast} from "ngx-sonner";
import {FirestoreService} from "../../services/firestore.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class Header {
  imageSrcProfile: string = '';
  @Input()
  imageAlt: string = 'image'
  @ContentChild('text')
  text: TemplateRef<any>
  @ContentChild('text11')
  text11: TemplateRef<any>
  @ContentChild('link5')
  link5: TemplateRef<any>
  @Input()
  imageSrc: string = '/assets/image%20(2)-1500h.png'
  @ContentChild('text2')
  text2: TemplateRef<any>
  @ContentChild('link4')
  link4: TemplateRef<any>
  @ContentChild('link3')
  link3: TemplateRef<any>
  @Input()
  imageAlt2: string = 'image'
  @ContentChild('link1')
  link1: TemplateRef<any>
  @Input()
  rootClassName: string = ''
  @Input()
  imageSrc2: string = '/assets/image%20(2)-1500h.png'
  @Input()
  textUrl: string = 'https://example.com'
  @ContentChild('text3')
  text3: TemplateRef<any>
  @Input()
  textUrl2: string = 'https://example.com'
  @ContentChild('link2')
  link2: TemplateRef<any>

  user$: Observable<any> | undefined;
  userId: string | null = null;
  isNotificationVisible: boolean = false;
  private _authState = inject(AuthStateService);
  private _fireService = inject(FirestoreService);
  private _router = inject(Router);
  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.getUserId();
    this.loadUser();
  }

  async logout() {
    await this._authState.logout().then(() => {
      toast.success("Session success")
      this._router.navigate(['/']);
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }

  async getUserId(): Promise<void> {
    const currentUser = await this._authState.currentUser;
    if (currentUser && currentUser.uid) {
      this.userId = currentUser.uid;
      console.log('ID del usuario autenticado:', this.userId);
    } else {
      console.error('No hay usuario autenticado');
    }
  }

  loadUser(): void {
    if (this.userId) {
      this.user$ = this._fireService.getDataFromCurrentAuthUser(this.userId);
      this.user$.subscribe(user => {
        this.imageSrcProfile = user.profilePerson?.picture || 'https://play.teleporthq.io/static/svg/default-img.svg';
      });
    }
  }

  toggleNotification(): void {
    this.isNotificationVisible = !this.isNotificationVisible;
  }
}
