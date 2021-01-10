import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShortUrl } from './shorturl.model';

@Injectable()
export class ShortUrlService {

    private API = environment.endpoint;
    private SHORT_URL_API = this.API + '/api/v1/rest/url';
    private shortUrl: ShortUrl = new ShortUrl();

    constructor(private http: HttpClient) { }

    findAll(): Observable<any> {
        return this.http.get(this.SHORT_URL_API);
    }

    generateURL(): Observable<any> {
        return this.http.post(this.SHORT_URL_API, this.getShortUrl());
    }

    setShortUrl(url: ShortUrl) {
        this.shortUrl.url = url;
    }

    private getShortUrl() {
        return this.shortUrl;
    }

    reset() {
        this.shortUrl.Clear();
    }
}