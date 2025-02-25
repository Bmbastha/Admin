import { Component } from '@angular/core';
import { EditsubitemsService } from '../editsubitems.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editsubitems',
  standalone: false,
  
  templateUrl: './editsubitems.component.html',
  styleUrl: './editsubitems.component.css'
})
export class EditsubitemsComponent { 
  subItems: any[] = [];
  itemId!: number;
  showEditCard: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private editsubitemsService: EditsubitemsService
  ) {}

  ngOnInit(): void {
    // Get the item ID from the route parameters
    this.route.queryParams.subscribe((params) => {
      this.itemId = params['id'];
      if (this.itemId) {
        this.fetchSubItemDetails(this.itemId);
      }
    });
  }

  fetchSubItemDetails(id: number) {
    this.editsubitemsService.getSubItemDetails(id).subscribe(
      (response) => {
        console.log('Sub-item details fetched:', response);
        this.subItems = response.data;
        this.showEditCard = true;
      },
      (error) => {
        console.error('Error fetching sub-item details:', error);
        alert('Failed to fetch sub-item details.');
      }
    );
  }

  editSubItem(subItem: any) {
    // Logic for editing a sub-item (e.g., navigate to another page or open a modal)
    alert(`Editing sub-item with ID: ${subItem.iq_id}`);
  }

  closeEditCard() {
    this.showEditCard = false; // Hide the card
  }

}
