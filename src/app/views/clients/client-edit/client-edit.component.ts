import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormModule, GridModule, ModalModule } from '@coreui/angular';
import { ClientService } from '../../../services/client.services';
import { ToastrService } from 'ngx-toastr';
import { ClientResponseModel,  DeleteClientRequestModel, UpdateClientRequestModel, AddressClientResonseModel } from '../../../models/Client/client.model';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressService } from '../../../services/address.service';
import { AddressFormComponent } from './address-form/address-form.component';
import { CreateAddressRequestModel, UpdateAddressRequestModel } from '../../../models/address/address.model';

@Component({
  selector: 'app-client-edit',
  imports: [CardBodyComponent,
    CardComponent,
    ReactiveFormsModule,
    CardHeaderComponent,
    FormModule,
    ButtonDirective,
    GridModule,
    ModalModule,
    AddressListComponent,
    AddressFormComponent,

  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent implements OnInit {
  cliente: ClientResponseModel | null = null;
  clientForm: FormGroup;
  fieldTextType: boolean = false;

  editingAddress: AddressClientResonseModel | null = null;
  visibleAddressFrom: boolean = false;
  habilitaexclusao: boolean = false;
  habilitaModalendereco: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private clientService: ClientService,
    private toastr: ToastrService,
    private addressService: AddressService) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      document: ['', Validators.required],
      bitrhDate: ['', Validators.required],
      type: ['', Validators.required],
      stateRegistration: [''],
      freeStateRegistration: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.getClient();
  }



  getClient() {
    var id = this.route.snapshot.params["id"];
    this.clientService.getClient(id)
      .subscribe({
        next: (response) => {
          this.cliente = response;
          this.clientForm = this.fb.group({
            name: [response.name, Validators.required],
            email: [response.email, Validators.required],
            phone: [response.phone, Validators.required],
            document: [response.document, Validators.required],
            bitrhDate: [new Date(response.bitrhDate).toISOString().slice(0, 10), Validators.required],
            type: [response.personType, Validators.required],
            stateRegistration: [response.stateRegistration],
            freeStateRegistration: [response.freeStateRegistration],
          });
          if(response.addresses.length === 0){
            this.habilitaexclusao = true
          }
        },
        error: () => {
          this.toastr.error('Erro ao buscar cliente!', 'Cliente');
        },
      });
  }

  delete(): void {
    if (this.cliente) {
      var deleteClientRequest: DeleteClientRequestModel = {
        id: this.cliente.id
      };
      this.clientService.deleteClient(deleteClientRequest).subscribe({
        next: (response) => {
          this.toastr.warning(`Cliente deletado!`, 'Cliente');
          this.router.navigate(['/client/list']);
        },
        error: () => {
          this.toastr.error('Erro ao deletar cliente!', 'Cliente')
        },
      });
    }
    else
      this.toastr.error('Erro ao deletar cliente!', 'Cliente')
  }


  save(): void {
    if (this.cliente) {
      this.clientService.updateClient(this.cliente.id, this.prepareClientData(this.clientForm.value)).subscribe({
        next: (response) => {
          this.toastr.success(`Cliente atualizado!`, 'Cliente');
          this.router.navigate(['/client/list']);
        },
        error: () => {
          this.toastr.error('Erro ao atualizar Cliente!', 'Cliente')
        },
      });
    }
    else
      this.toastr.error('Erro ao atualizar Cliente!', 'Cliente')

  }

  prepareClientData(formData: UpdateClientRequestModel): UpdateClientRequestModel {
    var data = {
      ...formData,
      id: this.cliente?.id??"",
      freeStateRegistration: formData.freeStateRegistration??false,
      bitrhDate: new Date(formData.bitrhDate).toISOString(),
      type: Number(formData.type)
    };
    return data;
  }

  cancel(): void {
    this.router.navigate(['/client/list']);
  }

  onAddressSave(address: AddressClientResonseModel): void {
    if (address.id) {
      // Atualizar endereço existente
      this.addressService.updateUser(address.id, this.prepareAddressUpdateData(address)).subscribe({
        next: () => {
          this.visibleAddressFrom = false;
          this.toastr.success('Endereço atualizado!', 'Endereço');
          this.getClient();
        },
        error: (error) => {
          this.toastr.error('Erro ao atualizar endereço!', 'Endereço');
        }
      });
    } else {
      // Criar novo endereço
      this.addressService.saveAddress(this.prepareAddressCreateData(address)).subscribe({
        next: () => {
          this.visibleAddressFrom = false;
          this.toastr.success('Endereço criado!', 'Endereço');
          this.getClient();
        },
        error: (error) => {
          console.error('Erro ao criar endereço:', error);
          this.toastr.error('Erro ao criar o endereço!', 'Endereço');
        }
      });
    }
    this.habilitaexclusao = false;

    this.habilitaModalendereco = false;
  }

  prepareAddressCreateData(formData: AddressClientResonseModel): CreateAddressRequestModel {
    var data : CreateAddressRequestModel = {
      clientId: this.cliente?.id??"",
      zipCode: formData.zipCode,
      street: formData.street,
      number: formData.number,
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state
    };
    return data;
  }
  prepareAddressUpdateData(formData: AddressClientResonseModel): UpdateAddressRequestModel {
    var data : UpdateAddressRequestModel = {
      id: formData.id,
      zipCode: formData.zipCode,
      street: formData.street,
      number: formData.number,
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state
    };
    return data;
  }

  onAddressCancel(): void {
    this.habilitaModalendereco = false;
    this.editingAddress = null;
    this.visibleAddressFrom = false;

  }

  openAddressModal(address?: AddressClientResonseModel): void {
    this.habilitaModalendereco = true;
    this.editingAddress = address || null; // Define o novo valor
    this.visibleAddressFrom = true; // Abre o modal

  }

  deleteAddessEvent(deletado: boolean): void{
    if(deletado){
      this.getClient();
    }
  }
}
