import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BookModel } from './models/BookModel';

const booksUrl = 'https://book-heaven.firebaseio.com/books/';

@Injectable({
    providedIn: 'root'
})
export class BooksService {
    constructor(
        private http: HttpClient
    ) { }

    getAllBooks() {
        return this.http.get(`${booksUrl}.json`)
            .pipe(map((res: Response) => {
                const ids = Object.keys(res);
                const books: BookModel[] = [];
                for (const i of ids) {
                    books.push(
                        new BookModel(
                            res[i].Title,
                            res[i].Description,
                            res[i].Author,
                            res[i].Published,
                            res[i].ImageUrl,
                            i
                        )
                    )
                }

                return books;
            }));
    }

    createRecipe(body: BookModel) {
        return this.http.post(`${booksUrl}.json`, body);
    }

    getById(bookId: string) {
        return this.http.get<BookModel>(`${booksUrl}${bookId}/.json`);
    }

    editRecipe(body) {
        return this.http.patch(`${booksUrl}.json`, body);
    }

    deleteRecipe(bookId: string) {
        return this.http.delete(`${booksUrl}${bookId}/.json`);
    }
}