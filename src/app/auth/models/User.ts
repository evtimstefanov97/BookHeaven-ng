import { IUser } from "../interfaces/IUser";

export class User implements IUser {
    constructor(public ID: string,
        public UserName: string,
        public Email: string,
        public Joined: Date,
        public BooksCreated: number
    ) { }
}