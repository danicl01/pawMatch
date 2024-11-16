import { Component, Input, ContentChild, TemplateRef } from '@angular/core'

@Component({
  selector: 'owner-component',
  templateUrl: 'owner-component.component.html',
  styleUrls: ['owner-component.component.css'],
})
export class OwnerComponent {
  @ContentChild('text8')
  text8: TemplateRef<any>
  @ContentChild('text7')
  text7: TemplateRef<any>
  @ContentChild('text4')
  text4: TemplateRef<any>
  @Input()
  imageSrc1: string = 'https://play.teleporthq.io/static/svg/default-img.svg'
  @Input()
  imageAlt1: string = 'image'
  @Input()
  imageSrc3: string = '/assets/female-200h.png'
  @Input()
  rootClassName: string = ''
  @ContentChild('text')
  text: TemplateRef<any>
  @ContentChild('text1')
  text1: TemplateRef<any>
  @ContentChild('text9')
  text9: TemplateRef<any>
  @Input()
  imageAlt4: string = 'image'
  @ContentChild('text5')
  text5: TemplateRef<any>
  @Input()
  imageSrc4: string = '/assets/like%20(1)-200h.png'
  @ContentChild('text3')
  text3: TemplateRef<any>
  @ContentChild('text6')
  text6: TemplateRef<any>
  @Input()
  imageAlt3: string = 'image'
  raw0zzp: string = ' '
  rawpr3n: string = ' '
  constructor() {}
}
