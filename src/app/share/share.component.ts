import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  weblink: any;
  btnVal = 'Copy to clipboard';
  constructor (
    private route: ActivatedRoute
  ) {
    this.weblink = 'http://localhost:4200/collections/' + this.route.snapshot.paramMap.get('id');
  }

  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.btnVal = 'Copied!';
  }

  ngOnInit() {
  }

}
