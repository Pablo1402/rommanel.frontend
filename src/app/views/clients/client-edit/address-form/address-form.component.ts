import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressClientResonseModel } from '../../../../models/Client/client.model';
import { ButtonDirective, FormModule, GridModule } from '@coreui/angular';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormModule,
    GridModule,
    ButtonDirective
  ],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  @Input() address: AddressClientResonseModel | null = null;
  @Input() clientId: string = '';
  @Output() save = new EventEmitter<AddressClientResonseModel>();
  @Output() cancel = new EventEmitter<void>();

  addressForm: FormGroup;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      zipCode: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    console.log(this.address);
    if (this.address) {
      this.isEditing = true;
      this.addressForm = this.fb.group({
        zipCode: [this.address.zipCode, [Validators.required]],
        street: [this.address.street, [Validators.required]],
        number: [this.address.number, [Validators.required]],
        neighborhood: [this.address.neighborhood, [Validators.required]],
        city: [this.address.city, [Validators.required]],
        state: [this.address.state, [Validators.required]]
      });
    }
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const formValue = this.addressForm.value;
      const addressData: AddressClientResonseModel = {
        ...formValue,
        id: this.address?.id || '',
        clientId: this.clientId
      };
      this.save.emit(addressData);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
} 