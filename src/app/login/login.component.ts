import { Component } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'; // Import CookieService
import { Router } from '@angular/router'; // Import Router if you plan to navigate

// Define the response structure from the API
interface LoginResponse {
  code: number;
  message: string;
  token: string;
  data: {
    uid: number;
    mobile: string;
    name: string;
    role: string;
  };
}

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  otpForm: FormGroup;
  otpSent = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cookieService: CookieService, // Inject CookieService
    private router: Router // Inject Router for navigation (optional)
  ) {
    this.loginForm = this.fb.group({
      countryCode: ['+91', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  // Send OTP to the mobile number
  sendOtp() {
    if (this.loginForm.valid) {
      const { countryCode, mobileNumber } = this.loginForm.value;

      // Extract the numeric part of the country code
      const numericCountryCode = countryCode.replace('+', '');
      // Combine the country code and mobile number
      const mobile = `${numericCountryCode}${mobileNumber}`;
      console.log(mobile);

      // Adjust the request body to only include mobile
      const requestBody = { mobile };

      this.http.post(`${environment.serverUrl}/api/auth/login`, requestBody).subscribe(response => {
        console.log('OTP sent:', response);
        this.otpSent = true; // Show OTP field
      }, error => {
        console.error('Error sending OTP:', error);
      });
    }
  }

  // Verify OTP and complete login
  verifyOtp() {
    if (this.otpForm.valid) {
      const { otp } = this.otpForm.value;
      const { countryCode, mobileNumber } = this.loginForm.value;

      // Extract the numeric part of the country code
      const numericCountryCode = countryCode.replace('+', '');
      // Combine the country code and mobile number
      const mobile = `${numericCountryCode}${mobileNumber}`;

      const requestBody = { otp, mobile }; // Send both OTP and mobile

      this.http.post<LoginResponse>(`${environment.serverUrl}/api/auth/login/verify`, requestBody).subscribe(response => {
        console.log('OTP verified:', response);

        if (response.code === 1) {
          // Store the token in cookie storage
          this.cookieService.set('auth_token', response.token);

          // Optionally, navigate to another page (e.g., Dashboard) after successful login
          this.router.navigate(['/']); // Example route to navigate after login
        }
      }, error => {
        console.error('Error verifying OTP:', error);
      });
    }
  }
}
