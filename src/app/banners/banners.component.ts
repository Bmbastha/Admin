import { Component } from '@angular/core';
import { BannerService } from '../banner.service';

@Component({
  selector: 'app-banners',
  standalone: false,
  
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.css'
})
export class BannersComponent {
   bannerUrl: string = '';
  bannerStatus: string = 'active';
  constructor(private bannerService: BannerService) {}


  saveBanner() {
    const payload = {
      title: 'Welcome Banner',
      banner_image: this.bannerUrl
    };

    this.bannerService.addBanner(payload).subscribe(
      response => {
        console.log('Banner added successfully:', response);
      },
      error => {
        console.error('Error adding banner:', error);
      }
    );
  }

}
