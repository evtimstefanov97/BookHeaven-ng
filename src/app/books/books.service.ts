import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BookModel } from './models/BookModel';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';

const booksUrl = 'https://book-heaven.firebaseio.com/books/';

@Injectable({
    providedIn: 'root'
})
export class BooksService {
    private authPersisted: Boolean = false
    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.authPersisted = true;
            }
        })
    }

    async getAllBooks(): Promise<Observable<BookModel[]>> {
        let $books: Observable<BookModel[]>;
        let hasUser = await this.auth.getCurrentUser();

        if (hasUser) {
            $books = await this.http.get(`${booksUrl}.json`)
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
        return $books
    }

    createBook(body: BookModel) {
        return this.http.post(`${booksUrl}.json`, body);
    }

    getById(bookId: string) {
        return this.http.get<BookModel>(`${booksUrl}${bookId}/.json`);
    }

    editBook(body) {
        return this.http.patch(`${booksUrl}.json`, body);
    }

    deleteBook(bookId: string) {
        return this.http.delete(`${booksUrl}${bookId}/.json`);
    }
}