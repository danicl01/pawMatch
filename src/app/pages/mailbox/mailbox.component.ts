import {Component, inject} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mailbox',
  templateUrl: 'mailbox.component.html',
  styleUrls: ['mailbox.component.css'],
})
export class Mailbox {
  raw1ik8: string = ' '
  receiverId: string | null = null;

  private _activatedRoute = inject(ActivatedRoute);
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Mailbox - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Mailbox - PawMatch',
      },
    ])
  }

  async ngOnInit(): Promise<void> {
    this._activatedRoute.queryParams.subscribe(params => {
      this.receiverId = params['selectedUserId'];
      console.log('Selected User ID:', this.receiverId);
    });


  }
}
