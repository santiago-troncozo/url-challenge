import { Component, ElementRef, ViewChild } from '@angular/core';
import { url } from 'src/app/interfaces/url';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  urls: url[];
  errorMessage = '';
  @ViewChild('inputUrl') inputUrl!: ElementRef;

  constructor(private urlService: UrlService) {
    this.urls = this.urlService.getUrls();
  }
  
  async addUrl(url: string): Promise<void> {
    if (!url) {
      this.errorMessage = 'Please add a link';
      return;
    }

    try {
      this.urls = await this.urlService.addUrl(url);
      this.inputUrl.nativeElement.value = '';
      this.errorMessage = '';
    } catch (err) {
      console.log(err);
      this.errorMessage = 'Invalid link';
    }
  }

  copyUrl(url: url) {
    navigator.clipboard.writeText(url.shortUrl);
    url.isCopied = true;
    setTimeout(() => url.isCopied=false, 3000);
  }
}
