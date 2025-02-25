import { Component } from '@angular/core';
import { DeliveryService } from '../delivery.service';

@Component({
  selector: 'app-delivery',
  standalone: false,
  
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent {
  
  area: number = null;
  status: string = '';
  skip: number = 0;
  limit: number = 10;
  orders: any[] = [];
  agents: any[] = [];
  showAgentCard: boolean = false;
  selectedOrderId: number | null = null;
  selectedOrder: any = null;
  showStatusCard: boolean = false;
  pincodeSuggestions: string[] = [];


  statusOptions = [
    'waiting', 'order_failed', 'order_placed', 'shipped', 'out-for-delivery', 'delivered',
    'cancellation_waiting', 'cancelled', 'return_requested', 'return_request_accepted',
    'returned', 'refund_done'
  ];
  
  skipOptions = Array.from({ length: 10 }, (_, i) => i * 10); 
  limitOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 10); 

  constructor(private deliveryService: DeliveryService) {}
   fetchPincodeSuggestions() {
  if (!this.area || this.area.toString().length < 3) {
    this.pincodeSuggestions = [];
    return;
  }

  const url = `/api/admin/pincode/`;
  this.deliveryService.getPincodeSuggestions(url).subscribe(response => {
    if (response.code === 1) {
      this.pincodeSuggestions = response.data.map((item: any) => item.code);
    } else {
      this.pincodeSuggestions = [];
    }
  });
}

selectPincode(pincode: number) {
  this.area = pincode;
  this.pincodeSuggestions = [];  // Hide suggestions after selecting
}
  searchOrders() {
    const url = `/api/delivery/admin/order?limit=${this.limit}&skip=${this.skip}&status=${this.status}&area=${this.area}`;
    this.deliveryService.getOrders(url).subscribe(response => {
      if (response.code === 1) {
        this.orders = response.data;
      } else {
        alert('Failed to fetch orders');
      }
    });
  }

  assignDelivery(order: any) {
    this.selectedOrderId = order.id;
    console.log(this.selectedOrderId);
    const url = `/api/delivery/admin/list/agent?area=${this.area}`;
    this.deliveryService.getAgents(url).subscribe(response => {
      if (response.code === 1) {
        this.agents = response.data;
        this.showAgentCard = true;
      } else {
        alert('No agents available for this area.');
      }
    });
  }

   confirmAssignment(agent: any) {
    if (this.selectedOrderId === null) {
      alert('No order selected for assignment!');
      return;
    }

    const requestBody = {
      order_id: this.selectedOrderId,
      agent_id: agent.id
    };
    console.log(requestBody);

    this.deliveryService.assignAgent(requestBody).subscribe(response => {
      if (response.code === 1) {
        alert(`Assigned ${agent.name} to Order ID: ${this.selectedOrderId}`);
        this.showAgentCard = false;
        this.selectedOrderId = null;  // Reset after assignment
      } else {
        alert('Failed to assign agent. Please try again.');
      }
    });
  }
  openUpdateStatus(order: any) {
    this.selectedOrder = { ...order };  // Clone order object to avoid modifying original data
    this.showStatusCard = true;
  }
 updateOrderStatus() {
  const requestBody = {
    
    id: this.selectedOrder.id,
    status: this.selectedOrder.order_status
  };
  console.log(requestBody)

  this.deliveryService.updateOrderStatus(requestBody).subscribe({
    next: (response: any) => {  // <-- Add ": any" to avoid type error
      console.log("API Response:", response);

      if (response.code === 1) {
        alert('Order status updated successfully!');
        this.showStatusCard = false;
        this.searchOrders();
      } else {
        alert('Failed to update order status.');
      }
    },
    error: (error) => {
      console.error("Error updating order status:", error);
      alert('Error updating order status. Check console for details.');
    }
  });
}


   
   
  }




