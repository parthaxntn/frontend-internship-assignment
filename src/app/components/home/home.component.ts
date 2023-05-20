import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { Book } from "../../core/models/book-response.model";
import { SearchService } from "src/app/core/services/search.service";
// import {getSearches} from '../searchResults/searchResult.component'

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;

  constructor(
    public SearchService: SearchService,
  ) {
    this.bookSearch = new FormControl('');
  }

  books: Book[] = []
  counter = 0;
  searchKey = document.getElementById('searchKey');

  getSearches(sort: string, page: number) {
    this.SearchService.getSearches(this.bookSearch.value, sort, page).subscribe((data) => {
      this.books = data?.docs;
    });
    console.log(this.books);

  }

  
  @HostListener('window:keypress', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 83) {
      this.searchKey = document.getElementById('searchKey');
      this.searchKey?.focus();
    }        
  }


  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe((value: string) => {
      });

  }
}
