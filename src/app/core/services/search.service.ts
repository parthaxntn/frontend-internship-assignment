import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  constructor(
    private apiService: ApiService
  ) { }

getSearches(query: string, sort: string, page: number, searchBy: string): Observable<BookResponse> {

    return this.apiService.get(`/search.json?${searchBy==='any'?'q':searchBy}=${query.toLowerCase().split(' ').join('+')}&page=${page}&sort=${sort}&limit=10`)
  }
}