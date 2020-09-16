import { RssFeedAction, RssFeedActionTypes } from '../actions/rss-feed.actions';
import { RssFeedItem, NewsRss } from '../models/rss-feed.model';

const initialstate: Array<RssFeedItem> = [
    // {
    //     id: '1',
    //     name: 'NDTV',
    //     link: 'https://gadgets.ndtv.com/rss/feeds',
    // },
    {
        id: '2',
        name: 'SMH',
        link: 'https://www.smh.com.au/rss/feed.xml'
    }
];

export function RssFeedReducer (
    state: Array<RssFeedItem> = initialstate,
    action: RssFeedAction,
){
    switch(action.type) {
        case RssFeedActionTypes.ADD_ITEM:
            return [...state, action.payload];
        case RssFeedActionTypes.DELETE_ITEM:
            return state.filter(item => item.id !== action.payload);
        default: 
            return state;    
    }
}


