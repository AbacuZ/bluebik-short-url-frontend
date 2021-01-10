import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from '@app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  subscription: Subscription;
  rowDatas: any[] = [];

  constructor(private shortUrlService: ShortUrlService) { }

  ngOnInit() {
    this.getShortUrlData();
  }

  getShortUrlData() {
    this.subscription = this.shortUrlService.findAll().subscribe(async res => {
      if (res && res.code === 200) {
        this.rowDatas = res.result;
      }
    });
  }

}
