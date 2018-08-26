import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BookModel } from './models/BookModel';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { IUser } from '../auth/interfaces/IUser';
import { User } from '../auth/models/User';

const booksUrl = 'https://book-heaven.firebaseio.com/books/';
const genresUrl = 'https://book-heaven.firebaseio.com/Genres/';
const usersUrl = 'https://book-heaven.firebaseio.com/userIds/';

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

    getAllBooks(): Observable<BookModel[]> {
        return this.http.get(`${booksUrl}.json`)
            .pipe(map((res: Response) => {
                if (res) {
                    const ids = Object.keys(res);
                    const books: BookModel[] = [];
                    for (const i of ids) {
                        books.push(
                            new BookModel(
                                res[i].Title,
                                res[i].Description,
                                res[i].Author,
                                res[i].Published,
                                res[i].Genre,
                                res[i].ImageUrl,
                                res[i].CreatorName,
                                !!res[i].CreatedOn && new Date(res[i].CreatedOn) || null,
                                i,
                                res[i].CreatorName
                            )
                        )
                    }
                    return books;
                } else {
                    return [];
                }

            }));
    }
    getByGenre(genre: string): Observable<BookModel[]> {
        return this.http.get(`${booksUrl}.json?orderBy="Genre"&equalTo="${genre}"`)
            .pipe(map((res: Response) => {
                if (res) {
                    const ids = Object.keys(res);
                    const books: BookModel[] = [];
                    for (const i of ids) {
                        books.push(
                            new BookModel(
                                res[i].Title,
                                res[i].Description,
                                res[i].Author,
                                res[i].Published,
                                res[i].Genre,
                                res[i].ImageUrl,
                                res[i].CreatorName,
                                !!res[i].CreatedOn && new Date(res[i].CreatedOn) || null,
                                i,
                                res[i].CreatorName
                            )
                        )
                    }
                    return books;
                }
                return [];
            }));
    }

    async getAllGenres(): Promise<Observable<string[]>> {
        return await this.http.get(`${genresUrl}.json`)
            .pipe(map((res: Response) => {
                const ids = Object.keys(res);
                const genres: string[] = [];
                for (const i of ids) {
                    genres.push(
                        res[i]
                    )
                }
                return genres;
            }));
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
        return this.http.delete(`${booksUrl}${bookId} /.json`);
    }
}