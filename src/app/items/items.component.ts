import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ItemsService } from '../items.service';
import { Router } from '@angular/router';
import { SubitemsService } from '../subitems.service';

@Component({
  selector: 'app-items',
  standalone: false,
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
 itemForm: FormGroup;
  subItemForm: FormGroup; 
  pincodeForm: FormGroup;  
  pincodes: string[] = []; // Store fetched pincodes
  filteredPincodes: string[] = []; // Filtered results for search
  selectedPincodes: Set<string> = new Set(); // Store selected pincodes
  showSuggestions: boolean = false; // Control visibility of suggestion box
  searchText: string = '';

  items: any[] = [];
  suppliers: any[] = [];
  showConfirmationCard: boolean = false;
  showEditSubItemCard: boolean = false;
  showEditSubItemDetailsCard: boolean = false;  // New flag for the edit sub-item card
  showAddPincodeCard: boolean = false;
  showRemovePincodeCard: boolean = false;
  subItems: any[] = [];
  selectedItemId: number | null = null;
  selectedSubItem: any = null;  // Store selected sub-item for editing 
  isSubItemModalOpen = false; 
  subItemData = {
    item_id: null,
    quantity: null,
    price: null,
    units: null,
    discount: null
  };

  constructor(
    private formBuilder: FormBuilder,
    private itemsService: ItemsService,
    private router: Router,
    private subitemsService: SubitemsService
  ) {
    this.itemForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      brandId: [''],
      images: [''],
      isOrganic: [],
      supplierId: ['']
    });

    // Initialize the form for editing sub-item details
    this.subItemForm = this.formBuilder.group({
      quantity: [null, Validators.required],
      price: [null, Validators.required],
      discount: [null],
      units: [null, Validators.required]
    });
    this.pincodeForm = this.formBuilder.group({
      itemId: [{ value: null, disabled: true }, Validators.required],
      pincode: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.itemsService.getSuppliers().subscribe(
      (response) => {
        console.log('Suppliers fetched:', response);
        this.suppliers = response.data;
      },
      (error) => {
        console.error('Error fetching suppliers:', error);
        alert('Failed to load suppliers.');
      }
    );
    this.fetchItems();
    this.fetchPincodes();
  }

  fetchItems() {
    this.itemsService.getItems().subscribe(
      (response) => {
        console.log('Items fetched:', response);
        this.items = response.data;
      },
      (error) => {
        console.error('Error fetching items:', error);
        alert('Failed to load items.');
      }
    );
  }

  onSubmit() {
    const formValue = this.itemForm.value;
    const supplierId = parseInt(formValue.supplierId, 10);

    const requestBody = {
      name: formValue.name,
      description: formValue.description,
      category: formValue.category,
      brand_id: formValue.brandId,
      images: formValue.images.split(',').map((url: string) => url.trim()),
      isorganic: formValue.isOrganic,
      supplier_id: supplierId
    };

    this.itemsService.addItem(requestBody).subscribe(
      (response) => {
        console.log('Item added successfully:', response);
        alert('Item added successfully!');
        this.items.push(requestBody);
        this.itemForm.reset();
        this.itemForm.patchValue({ isOrganic: 'false' });
      },
      (error) => {
        console.error('Error adding item:', error);
        alert('Failed to add item. Please try again.');
      }
    );
  }
  fetchPincodes() {
    this.itemsService.getPincodes().subscribe(
      (response) => {
        this.pincodes = response.data.map(p => p.code);
        this.filteredPincodes = [...this.pincodes]; // Initialize filtered list
      },
      (error) => {
        console.error('Error fetching pincodes:', error);
      }
    );
  }
    openAddPincodeCard(itemId: number) {
    this.selectedItemId = itemId;
    this.showAddPincodeCard = true;
    this.pincodeForm.patchValue({
      itemId: itemId
    });
  }
   closeAddPincodeCard() {
    this.showAddPincodeCard = false;
    this.pincodeForm.reset();
  }
  filterPincodes(searchText: string) {
     console.log("Search Text:", this.searchText);

  if (!this.searchText || !this.searchText.trim()) {
    this.filteredPincodes = [...this.pincodes]; // Reset filter
    return;
  }

  this.filteredPincodes = this.pincodes.filter((pincode) =>
    pincode.toString().includes(this.searchText.trim())
  );

  console.log("Filtered Pincodes:", this.filteredPincodes);
  }
  togglePincodeSelection(pincode: string) {
    if (this.selectedPincodes.has(pincode)) {
      this.selectedPincodes.delete(pincode);
    } else {
      this.selectedPincodes.add(pincode);
    }
    this.pincodeForm.patchValue({ pincode: Array.from(this.selectedPincodes).join(', ') });
  }

  onPincodeFocus() {
  this.showSuggestions = !this.showSuggestions;
}
 
   onAddPincode() {
    if (this.selectedPincodes.size === 0) {
      alert('Please select at least one pincode.');
      return;
    }

    const requestBody = {
      item_id: this.selectedItemId,
      pincode: Array.from(this.selectedPincodes).map(p => Number(p)) 
    };

    this.itemsService.addPincode(requestBody).subscribe(
      () => {
        alert('Pincode(s) added successfully!');
        this.closeAddPincodeCard();
      },
      (error) => {
        console.error('Error adding pincode:', error);
        alert('Failed to add pincode.');
      }
    );
  }

 
 openRemovePincodeCard(itemId: number) {
  this.selectedItemId = itemId;  // Store the selected item ID
  this.showRemovePincodeCard = true;  // Show the remove pincode form
  this.pincodeForm.patchValue({
    itemId: itemId  // Pre-fill the form field with the item ID
  });
}
closeRemovePincodeCard() {
  this.showRemovePincodeCard = false;
  this.pincodeForm.reset();
}
onRemovePincode() {
  if (this.pincodeForm.invalid) {
    alert('Please fill in all the required fields.');
    return;
  }

  const pincode = this.pincodeForm.value.pincode;  
  const itemId = this.selectedItemId;   

  if (!itemId || isNaN(itemId)) {
    alert('Invalid Item ID. Please enter a valid Item ID.');
    return;
  }

  const pincodeNumber = Number(pincode);

  if (isNaN(pincodeNumber)) {
    alert('Invalid pincode format. Please enter a valid pincode.');
    return;
  }

  const requestBody = {
  item_id: this.selectedItemId,
  pincode: pincodeNumber
};

  console.log("Removing Pincode Request Body:", requestBody);  // Added log to verify

  this.itemsService.removePincode(requestBody).subscribe(
    (response) => {
      alert('Pincode removed successfully!');
      this.closeRemovePincodeCard();  
    },
    (error) => {
      console.error('Error removing pincode:', error);
      alert('Failed to remove pincode. Please try again.');
    }
  );
}



  showConfirmation(item_id:number) {
    this.selectedItemId = item_id;
    this.showConfirmationCard = true;
  }

  closeConfirmationCard() {
    this.showConfirmationCard = false;
  }
   openSubItemModal() {
    console.log("nebfue")
    this.showConfirmationCard = false;
    this.isSubItemModalOpen = true;

  }
  closeSubItemModal() {
    this.isSubItemModalOpen = false;
  }

  navigateToAddSubItems() {
    this.showConfirmationCard = false;
    this.router.navigate(['/addsubitems']);
  }

  openEditSubItemCard(itemId: number) {
    this.selectedItemId = itemId;
    this.showEditSubItemCard = true;
    this.itemsService.getSubItemDetails(itemId).subscribe(
      (response) => {
        console.log('Sub-Items fetched:', response);
        this.subItems = response.data;
      },
      (error) => {
        console.error('Error fetching sub-items:', error);
        alert('Failed to fetch sub-items.');
      }
    );
  }

  closeEditSubItemCard() {
    this.showEditSubItemCard = false;
    this.subItems = [];
  }

  // Open the form to edit the selected sub-item
  openEditSubItemDetails(subItem: any) {
    this.selectedSubItem = subItem;
    this.showEditSubItemDetailsCard = true;
    this.subItemForm.patchValue({
      quantity: subItem.quantity,
      price: subItem.price,
      discount: subItem.discount,
      units: subItem.units
    });
  }

  closeEditSubItemDetailsCard() {
    this.showEditSubItemDetailsCard = false;
    this.subItemForm.reset();
  }

  // Update the sub-item
  onUpdateSubItem() {
     if (this.subItemForm.invalid) {
    alert('Please fill in all the required fields.');
    return;
  }

  // Prepare the updated sub-item request body
  const updatedSubItem = {
    iqu_id: this.selectedSubItem.iqu_id,  // Using the ID of the selected sub-item
    item_id: this.selectedItemId,         // The item ID that the sub-item belongs to
    quantity: this.subItemForm.value.quantity,
    price: this.subItemForm.value.price,
    units: this.subItemForm.value.units,
    discount: this.subItemForm.value.discount
  };

  // Send the update request to the backend API
  this.itemsService.updateSubItem(updatedSubItem).subscribe(
    (response) => {
      console.log('Sub-item updated successfully:', response);
      alert('Sub-item updated successfully!');
      this.closeEditSubItemDetailsCard();
      this.fetchItems();  // Refresh the item list to reflect the updated sub-item
    },
    (error) => {
      console.error('Error updating sub-item:', error);
      alert('Failed to update sub-item. Please try again.');
    }
  );
    
  }
   onSubmitSubItem(subItemForm: NgForm) {
   console.log(this.subItemData);
    this.subitemsService.addSubItem(this.subItemData).subscribe(
      (response) => {
        console.log('Sub-item added successfully:', response);
        alert('Sub-item added successfully!');
        subItemForm.resetForm();
        this.isSubItemModalOpen = false;
        
       
      },
      (error) => {
        console.error('Error adding sub-item:', error);
        alert('Failed to add sub-item. Please try again.');
      }
    );
  }
}
