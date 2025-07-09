import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-address-management',
  templateUrl: './address-management.component.html',
  styleUrls: ['./address-management.component.css'],
})
export class AddressManagementComponent implements OnInit {
  addressForm!: FormGroup;
  addresses: any[] = [];
  editingAddressId: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAddresses();
  }

  initForm(): void {
    this.addressForm = this.fb.group({
      alias: ['', Validators.required],
      details: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
  }

  loadAddresses(): void {
    this.userService.getAddresses().subscribe({
      next: (res) => {
        console.log('addresses: ', res.data);
        this.addresses = res.data.addresses;
      },
      error: (err) => console.error(err),
    });
  }

  submitAddress(): void {
    if (this.addressForm.invalid) return;

    const payload = this.addressForm.value;

    if (this.editingAddressId) {
      this.userService.updateAddress(this.editingAddressId, payload).subscribe({
        next: () => {
          this.loadAddresses();
          this.addressForm.reset();
          this.editingAddressId = null;
        },
        error: (err) => console.error(err),
      });
    } else {
      this.userService.addAddress(payload).subscribe({
        next: () => {
          this.loadAddresses();
          this.addressForm.reset();
        },
        error: (err) => console.error(err),
      });
    }
  }

  editAddress(addr: any): void {
    this.editingAddressId = addr._id;
    this.addressForm.patchValue(addr);
  }

  deleteAddress(id: string): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.userService.deleteAddress(id).subscribe({
        next: () => this.loadAddresses(),
        error: (err) => console.error(err),
      });
    }
  }
}
