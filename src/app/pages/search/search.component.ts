import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
})
export class Search {
  selectedSex: string = '';
  constructor(private title: Title, private meta: Meta, private router: Router) {
    this.title.setTitle('Search - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Search - PawMatch',
      },
    ])
  }

  onFilterClick() :any {
    this.router.navigate(['/home'], { queryParams: { sex: this.selectedSex } });
  }
}
