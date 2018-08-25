import { Injectable } from '@angular/core';
@Injectable()
export class BookEditSharedService {

    _bookCreatorId: string;

    set BookCreatorId(value: string) {
        this._bookCreatorId = value;
    }

    get BookCreatorId(): string {
        return this._bookCreatorId;
    }

    constructor() { }

}