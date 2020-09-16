import { RssFeedItem, NewsRss } from './store/models/rss-feed.model';
import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/models/app-state.model';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { AddItemAction, DeleteItemAction } from './store/actions/rss-feed.actions';
import { HttpClient } from "@angular/common/http";
import * as xml2js from "xml2js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public RssData: NewsRss;
  public rssfeedItem$: Observable<Array<RssFeedItem>>
  public allRssFeeds: any = [];
  public newrssfeedItem: RssFeedItem = { id: '', name: '', link: '' }
  public lastrssfeed: any
  public showUpdateRssFeed: boolean = false;
  public currentRssFeeds: boolean = false;
  public removeRssFeeds: boolean = false;
  public rssFeedHistory: any = [];
  public updatenews: any;

  constructor(private store: Store<AppState>, private http: HttpClient, private ngzone: NgZone, private cdr: ChangeDetectorRef) {
    setInterval(() => {
      this.allRssFeeds = [];
      this.rssFeedHistory = [];
      this.lastrssfeed = JSON.parse(localStorage.getItem('rssfeedtrack'))
      this.GetRssFeedData(this.lastrssfeed);
    }, 15 * 10000);
  }

  ngOnInit(): void {
    this.currentRssFeeds = true;
    this.rssfeedItem$ = this.store.select(store => store.rssfeed);
    this.GetRssFeedData('null');
  }

  addRssFeedLink(value: any) {
    const requestOptions: Object = {
      observe: "body",
      responseType: "text"
    };
    this.http.get<any>(value.link, requestOptions).subscribe(data => {
      let parseString = xml2js.parseString;
      parseString(data, (err, result: NewsRss) => {
        this.RssData = result;
        if (this.RssData != undefined) {
          this.allRssFeeds = [];
          this.newrssfeedItem.id = uuid();
          this.store.dispatch(new AddItemAction(this.newrssfeedItem));
          this.newrssfeedItem = { id: '', name: '', link: '' };
        }else {
          alert('Something Went wrong, Please check the your rss-feeds link');
        }
      });
    });
   
  }

  GetRssFeedData(payload: any) {
    this.rssfeedItem$.forEach((data: any) => {
      for (const item of data) {
        this.synCall(item, payload);
      }
    });

  }
  synCall(item: any, payload: any) {
    const requestOptions: Object = {
      observe: "body",
      responseType: "text"
    };
    this.http.get<any>(item.link, requestOptions).subscribe(data => {
      let parseString = xml2js.parseString;
      parseString(data, (err, result: NewsRss) => {
        this.RssData = result;
        if (this.RssData != undefined) {
          if(payload === 'null') {
            this.rsspayload(item, this.RssData)
          }else {
            this.rsspayloads(item, this.RssData)
          }
          
        }
      });
    });

  }

  rsspayload(item, RssData) {
    const abc = {
      id: item.id,
      name: item.name,
      link: RssData,
    }
    this.allRssFeeds.push(abc);
    localStorage.setItem('rssfeedtrack', JSON.stringify(this.allRssFeeds));
  }

  rsspayloads(item, RssData) {
    const abc = {
      id: item.id,
      name: item.name,
      link: RssData,
    }
    this.allRssFeeds.push(abc);
    
  }

  updateRssFeeds(key: any, val: any, linkPayload: any) {
    if(this.lastrssfeed != undefined) {
      this.lastrssfeed.forEach(value => {
        const xx = value.link.rss.channel[0].item.find((item: any) => item.guid[0]._ === key)
        if (xx !== undefined){
          const idx = xx.pubDate[0].toString().trim().localeCompare(val.toString().trim());
          if(idx === 0) {
            this.updatenews = 'Not Update';
          }else if(idx === -1) {
            this.updatenews = 'Updated';
          }else {
            console.log('new');
          }
        }else {
          this.rssFeedHistory.push(linkPayload)
        }
        localStorage.setItem('rssfeedtrack', JSON.stringify(this.allRssFeeds));
      });
    }
    
  }

  showCurrentRssFeed() {
    this.currentRssFeeds = true;
    this.removeRssFeeds = false;
  }

  showRemoveRssFeed() {
    this.currentRssFeeds = false;
    this.removeRssFeeds = true;
   
  }

 


 


}
