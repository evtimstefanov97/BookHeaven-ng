export class BookModel {
    constructor(
        public Title: string,
        public Description: string,
        public Author: string,
        public Published: string,
        public Genre: string,
        public ImageUrl: string,
        public CreatorName: string,
        public CreatedOn: Date,
        public id?: string,
        public CreatorId?: string,
    ) { }
}