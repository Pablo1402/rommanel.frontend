import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AddressService } from '../../../../services/address.service';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../../shared/components/generic-table/generic-table.component';
import { AddressClientResonseModel } from '../../../../models/Client/client.model';
import { GridModule } from '@coreui/angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [CommonModule, 
    GenericTableComponent,
    
    GridModule],
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  @Input() addresses: AddressClientResonseModel[] | [] = [];
  @Output() edit = new EventEmitter<AddressClientResonseModel>();
  @Output() delete = new EventEmitter<boolean>();

  
  columns = [
    { key: 'zipCode', label: 'CEP' },
    { key: 'street', label: 'Rua' },
    { key: 'number', label: 'Número' },
    { key: 'neighborhood', label: 'Bairro' },
    { key: 'city', label: 'Cidade' },
    { key: 'state', label: 'Estado' }
  ];

  buttons = [
    { label: '', class: 'btn-primary', action: 'edit', icon: 'cil-pencil' },
    { label: '', class: 'btn-danger', action: 'delete', icon: 'cil-trash' }
  ];

  constructor(private addressService: AddressService,private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  onButtonClick(event: { action: string; row: any }): void {
    switch (event.action) {
      case 'edit':
        this.edit.emit(event.row);
        break;
      case 'delete':
        this.deleteAddress(event.row.id);
        break;
    }
  }

  editAddress(address: AddressClientResonseModel): void {
    console.log(address)
    this.edit.emit(address);
  }

  deleteAddress(addressId: string): void {
    this.addressService.deleteAddress({ id: addressId }).subscribe({
        next: () => {
            this.toastr.warning('Endereço excluido!', 'Endereço');
            this.delete.emit(true);
        },
        error: (error) => {
            this.toastr.error('Erro ao deletar endereço!', 'Endereço');
        }
      });
  }

  new(): void {
    this.edit.emit();
  }
} 