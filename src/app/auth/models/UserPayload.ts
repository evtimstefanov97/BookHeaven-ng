import { IUser } from '../interfaces/IUser';
export class UserPayload {
    constructor(
        public UserFireBaseObjectId: string,
        public userData: IUser) { }
}