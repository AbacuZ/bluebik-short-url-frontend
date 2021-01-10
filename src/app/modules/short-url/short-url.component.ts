import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShortUrlService } from '@app/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit, OnDestroy {

  shortUrlForm: FormGroup;
  isNextForm: boolean = false;
  subscription: Subscription;
  shortUrlData: any[] = [];
  isWarning: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private shortUrlService: ShortUrlService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initForm() {
    this.shortUrlForm = this.formBuilder.group({
      shortUrl: ['', Validators.required]
    });
  }

  get f() {
    return this.shortUrlForm.controls;
  }

  saveForm(form: FormGroup) {
    this.isNextForm = true;

    if (form.invalid) {
      return false;
    }

    this.shortUrlService.setShortUrl(this.shortUrlForm.value.shortUrl)
    return true;
  }

  onClickShorten() {
    if (this.saveForm(this.shortUrlForm)) {
      this.subscription = this.shortUrlService.generateURL().subscribe(async res => {
        if (res && res.code === 200) {
          this.isWarning = false;
          this.setData(res);
          this.reset();
        }
      },
        error => {
          if (error.error && error.error.code === 400) {
            this.isWarning = true;
            this.reset();
          }
        }
      );
    }
  }

  copyText(value: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  private setData(data: any) {
    this.shortUrlData.push({
      fullUrl: this.shortUrlForm.value.shortUrl,
      shortUrl: environment.endpoint + '/rest/' + data.result.id
    });
  }

  private reset() {
    this.shortUrlService.reset();
  }

}
