import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISelectOption } from 'ngx-semantic/modules/select';
import { CountryService } from '../services/country.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm!: FormGroup;
  submitted = false;
  isLoading = false;
  countries: ISelectOption[] = [];
  occupations = [
    { text: 'Frontend Developer', value: 'frontend' },
    { text: 'Backend Developer', value: 'backend' },
    { text: 'Designer', value: 'design' },
    { text: 'Devops Engineer', value: 'devops' },
  ];

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.fetchCountries();
  }

  initForm() {
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      country: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      successful: ['true'],
    });
  }

  fetchCountries() {
    this.countryService.getCountries().subscribe(
      (countries: ISelectOption[]) => {
        this.countries = countries;
      },
      (error: any) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  onSubmit() {
    this.isLoading = true;
    this.submitted = true;
    if (this.myForm.valid) {
      const successfulValue = this.myForm.value.successful;
      if (successfulValue === 'true') {
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/success']);
          // Show success toastr notification
          this.notificationService.showSuccess('Success!');
        }, 5000);
      } else {
        // Show error toastr notification for 5 seconds
        // Redirect back to the form page
        setTimeout(() => {
          this.isLoading = false;
          this.notificationService.showError('Failure!');
          this.router.navigate(['/']);
        }, 5000);
      }
    } else {
      this.notificationService.showError('Please fill in all required fields correctly!');
      this.isLoading = false;
    }
  }
}
