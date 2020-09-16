import { RssFeedItem } from './rss-feed.model'

export interface AppState {
    readonly rssfeed: Array<RssFeedItem>
};