import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-saves',
  templateUrl: 'saves.component.html',
  styleUrls: ['saves.component.css'],
})
export class Saves implements OnInit {
  currentUser: any = { savedUsers: [] };


  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Saves - PawMatch');
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Saves - PawMatch',
      },
    ]);
  }

  ngOnInit() {
    this.currentUser.savedUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ];
  }
}
