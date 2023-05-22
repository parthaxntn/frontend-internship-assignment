import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.scss'],
})



export class TrendingSubjectsComponent implements OnInit {

  isLoading: boolean = true;

  subjectName: string = '';

  allBooks: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService
  ) { }

  getAllBooks() {

    this.isLoading = true;
    this.allBooks = []
    const book_cache = localStorage.getItem(this.subjectName);

    if (book_cache) {
      const data = JSON.parse(book_cache);
      this.allBooks = data.works;
      this.isLoading = false;
    }
    else {
      this.subjectsService.getAllBooks(this.subjectName).subscribe((data) => {
        localStorage.setItem(this.subjectName, JSON.stringify(data));
        this.allBooks = data?.works;
        this.isLoading = false;
      });
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.isLoading = true;
      this.getAllBooks();
    });
  }

}