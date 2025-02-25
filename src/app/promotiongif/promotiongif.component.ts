import { Component } from '@angular/core';

@Component({
  selector: 'app-promotiongif',
  standalone: false,
  
  templateUrl: './promotiongif.component.html',
  styleUrl: './promotiongif.component.css'
})
export class PromotiongifComponent {
  gifUrl: string = '';
  gifStatus: string = 'active';

  saveGif() {
    // Implement the logic to save the promotional GIF
    console.log('Saving Promotional GIF:', {
      gifUrl: this.gifUrl,
      gifStatus: this.gifStatus
    });
  }

}
