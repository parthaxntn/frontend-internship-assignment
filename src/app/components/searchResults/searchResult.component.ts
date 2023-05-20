import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Book } from "src/app/core/models/book-response.model";
import { SearchService } from "src/app/core/services/search.service";

@Component({
    selector: 'front-end-internship-assignment-search-results',
    templateUrl: './searchResult.component.html',
    styleUrls: ['./searchResults.component.scss']
})


// let results = () =>{
//     const result =  
// }
// @Input(query = '')

export class searchResultsComponent {

    @Input() books: Book[] = [];
    @Input() getSearches: ((sort: string, page: number) => void) | undefined;
    @Input() bookSearch: FormControl = new FormControl('');
    
    constructor(
        public SearchService: SearchService,
    ) { }


    sort = "new"
    page = 1

    pageClick(num: number){
        if (this.page > 5){
            this.page = this.page + num - 5
        }
        else{
            this.page = num
        }
        this.getSearches?this.getSearches(this.sort,this.page):'hello';
    }

    listButtonClick(){
        if (this.sort === "new"){
            this.sort = "old"
        }
        else{
            this.sort = "new"
        }
        this.getSearches?this.getSearches(this.sort,this.page):'hello';
        
    }


}