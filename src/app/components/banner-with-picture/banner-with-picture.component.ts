import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner-with-picture',
  templateUrl: './banner-with-picture.component.html',
  styleUrl: './banner-with-picture.component.scss'
})
export class BannerWithPictureComponent {
  @Input() logoIsVisible: boolean = false;
  @Input() bannerIsVisible: boolean = false;
  @Input() heading: string = '';
  @Input() imgSrc: string = '';
  @Input() imgAlt: string = '';
  @Input() subtext: string = '';
  @Input() text: string = '';
  @Input() buttonText: string = '';
}
