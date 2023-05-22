import { Component, Input } from '@angular/core';
import { Book } from 'src/app/core/models/book-response.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})


export class TableViewComponent {
  @Input() booksList: Book[] = [];
  @Input() subjectName = '';

  constructor(private router: Router, private route: ActivatedRoute){}
  
  goBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
