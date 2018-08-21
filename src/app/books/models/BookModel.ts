export class BookModel {
    constructor(
        public Title: string,
        public Description: string,
        public Author: string,
        public Published: string,
        public ImageUrl: string,
        public id?: string,
    ) { }
}