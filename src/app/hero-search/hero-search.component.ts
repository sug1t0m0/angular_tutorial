import {Component, OnInit} from '@angular/core';

import {Observable, Subject} from 'rxjs';

import { Hero } from '../hero';

import {
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService
  ) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 各キーストロークの後、検索前に300ms待つ
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes((term)))
    );
  }

}
