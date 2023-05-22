import { Component, OnInit, Input, HostListener, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Book } from "../../core/models/book-response.model";
import { SearchService } from "src/app/core/services/search.service";
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

@Injectable({
  providedIn: 'root'
})

export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchBy: FormControl
  sort = "new"
  page = 1

  constructor(
    public SearchService: SearchService,
  ) {
    this.bookSearch = new FormControl('');
    this.searchBy = new FormControl('any');
  }
  

  books: Book[] = []
  counter = 0;
  searchKey = document.getElementById('searchKey');
  noResults = false
  numFound = 0
  isLoading = false;
  
  options: AnimationOptions = {
    path: 'https://assets4.lottiefiles.com/packages/lf20_tmsiddoc.json',
  };
  
  getSearches(sort: string, page: number) {
    
    if (this.bookSearch.value === "") {
      return
    }

    this.isLoading = true;
    this.books = []
    const book_cache = localStorage.getItem(this.bookSearch.value + "_" + sort + "_" + page + "_" + this.searchBy.value);

    if (book_cache) {
      const data = JSON.parse(book_cache);
      this.books = data.docs;
      this.isLoading = false;
      this.noResults = data?.numFound === 0 ? true : false;
      this.numFound = data?.numFound
    }
    else {
      this.SearchService.getSearches(this.bookSearch.value, sort, page, this.searchBy.value).subscribe((data) => {
        this.books = data?.docs;
        localStorage.setItem(this.bookSearch.value + "_" + sort + "_" + page + "_" + this.searchBy.value, JSON.stringify(data));
        this.isLoading = false;
        this.noResults = data?.numFound === 0 ? true : false;
        this.numFound = data?.numFound
      });

    }
  }


  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  formReset() {
    this.bookSearch.reset();
    this.books = []
    this.noResults = false
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
