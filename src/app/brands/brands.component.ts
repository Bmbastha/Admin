import { Component } from '@angular/core';
import { BrandsService } from '../brands.service';

@Component({
  selector: 'app-brands',
  standalone: false,
  
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
    brand = {
    name: '',
    images: '',
  };

  constructor(private brandsService: BrandsService) {}

  onSubmit() {
    const requestBody = {
      name: this.brand.name,
      images: this.brand.images.split(',').map((url) => url.trim()),
    };

    this.brandsService.addBrand(requestBody).subscribe(
      (response) => {
        console.log('Brand added successfully:', response);
        alert('Brand added successfully!');
      },
      (error) => {
        console.error('Error adding brand:', error);
        alert('Failed to add brand. Please try again.');
      }
    );
  }

}
