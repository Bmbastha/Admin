import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  notificationForm: FormGroup;

  constructor(private fb: FormBuilder, private notificationService: NotificationService) {
    this.notificationForm = this.fb.group({
      notificationTitle: ['', Validators.required], // Maps to "title"
      notificationDescription: ['', Validators.required], // Maps to "description"
      posterUrl: ['', Validators.required], // Maps to "poster"
    });
  }

  onSubmit() {
    if (this.notificationForm.valid) {
      const formValue = this.notificationForm.value;

      // Construct the request body for the backend
      const requestBody = {
        title: formValue.notificationTitle,
        description: formValue.notificationDescription,
        poster: formValue.posterUrl,
      };

      this.notificationService.updateNotification(requestBody).subscribe(
        (response) => {
          console.log('Notification updated successfully:', response);
          alert('Notification updated successfully!');
        },
        (error) => {
          console.error('Error updating notification:', error);
          alert('Failed to update notification. Please try again.');
        }
      );
    } else {
      console.log('Form is invalid');
      alert('Please fill in all required fields.');
    }
  }
}
