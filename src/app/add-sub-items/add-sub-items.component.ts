import { Component } from '@angular/core';
import { SubitemsService } from '../subitems.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sub-items',
  standalone: false,
  
  templateUrl: './add-sub-items.component.html',
  styleUrl: './add-sub-items.component.css'
})
export class AddSubItemsComponent {
   subItemData = {
    item_id: null,
    quantity: null,
    price: null,
    units: null,
    discount: null
  };

  constructor(private subitemsService: SubitemsService, private router: Router) {}

  onSubmit() {
    console.log(this.subItemData);
    this.subitemsService.addSubItem(this.subItemData).subscribe(
      (response) => {
        console.log('Sub-item added successfully:', response);
        alert('Sub-item added successfully!');
        this.router.navigate(['/']); 
      },
      (error) => {
        console.error('Error adding sub-item:', error);
        alert('Failed to add sub-item. Please try again.');
      }
    );
  }

}
