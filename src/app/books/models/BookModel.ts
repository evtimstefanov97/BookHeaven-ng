export class BookModel {
    constructor(
        public title: string,
        public description: string,
        public author: string,
        public published: string,
        public imageUrl: string,
        public id?: string,
    ) { }
}