import { Action } from '@ngrx/store';
import { RssFeedItem, NewsRss } from '../models/rss-feed.model';

export enum RssFeedActionTypes {
    ADD_ITEM = '[RSS-FEED] Add Item',
    RSS_Feed = '[RSS-FEED] News List', 
    DELETE_ITEM = '[RSS-FEED] Delete Item'
}

export class AddItemAction implements Action {
    readonly type = RssFeedActionTypes.ADD_ITEM;

    constructor(public payload: RssFeedItem) {}
}

export class DeleteItemAction implements Action {
    readonly type = RssFeedActionTypes.DELETE_ITEM;

    constructor(public payload: string) {}
}

export class NewItemAction implements Action {
    readonly type = RssFeedActionTypes.RSS_Feed;

    constructor(public payload: NewsRss) {}
}

export type RssFeedAction = AddItemAction | DeleteItemAction | NewItemAction;