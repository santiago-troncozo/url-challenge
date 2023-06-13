import { Injectable } from '@angular/core';
import { url, urlAPIReponse } from '../interfaces/url';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  urls: url[] = [];

  constructor(private http: HttpClient) { }

  async addUrl(url: string): Promise<url[]> {
    const shortedUrl = await this.generateShortLink(url);
    this.urls.push({ url, shortUrl: shortedUrl, isCopied: false });
    return this.urls;
  }

  getUrls(): url[] {
    return this.urls;
  }

  generateShortLink(url: string): Promise<string> {
    const api = `https://api.shrtco.de/v2/shorten?url=${url}`;
    return lastValueFrom(this.http.get<urlAPIReponse>(api).pipe(map<urlAPIReponse, string>((res: urlAPIReponse) => res.result.full_short_link)));
  }
}
