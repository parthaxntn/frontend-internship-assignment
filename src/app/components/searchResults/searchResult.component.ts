import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Book } from "src/app/core/models/book-response.model";
import { SearchService } from "src/app/core/services/search.service";

@Component({
    selector: 'front-end-internship-assignment-search-results',
    templateUrl: './searchResult.component.html',
    styleUrls: ['./searchResults.component.scss']
})

export class searchResultsComponent {

    @Input() books: Book[] = [];
    @Input() getSearches: ((sort: string, page: number) => void) | undefined;
    @Input() bookSearch: FormControl = new FormControl('');
    @Input() searchBy: FormControl = new FormControl('any');
    @Input() numFound: number = 0;
    @Input() isLoading = true;
    @Input() sort = "new";
    @Input() page = 1;

    num = this.numFound ? Math.ceil(this.numFound / 10) : 0

    ngOnInit() {
        this.num = Math.ceil(this.numFound / 10)
    }

    constructor(
        public SearchService: SearchService,
    ) {
    }



    pageClick(num: number) {
        this.isLoading = true;
        if (this.page > 5) {
            this.page = this.page + num - 5
        }
        else {
            this.page = num
        }
        this.getSearches ? this.getSearches(this.sort, this.page) : 'hello';
        this.isLoading = false;
    }

    listButtonClick() {
        this.isLoading = true;
        if (this.sort === "new") {
            this.sort = "old"
        }
        else {
            this.sort = "new"
        }
        this.getSearches ? this.getSearches(this.sort, this.page) : 'hello';
        this.isLoading = false;
    }
}