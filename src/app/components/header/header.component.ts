import { Component, Input, ContentChild, TemplateRef } from '@angular/core'
import {Router} from "@angular/router";
import {AuthStateService} from "../../auth/data-access/auth-state.service";
import {toast} from "ngx-sonner";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class Header {
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
  constructor(
      private authService: AuthStateService,
      private router: Router
  ) {}

  async logout() {
    await this.authService.logout().then(() => {
      toast.success("Session success")
      this.router.navigate(['/']);
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
