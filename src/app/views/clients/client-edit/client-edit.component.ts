import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormModule, GridModule, ModalModule } from '@coreui/angular';
import { ClientService } from '../../../services/client.services';
import { ToastrService } from 'ngx-toastr';
import { ClientResponseModel, CreateClientRequestModel, DeleteClientRequestModel, UpdateClientRequestModel } from '../../../models/Client/client.model';

@Component({
  selector: 'app-client-edit',
  imports: [CardBodyComponent,
    CardComponent,
    ReactiveFormsModule,
    CardHeaderComponent,
    FormModule,
    ButtonDirective,
    GridModule,
    ModalModule],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent implements OnInit {
  cliente: ClientResponseModel | null = null;
  clientForm: FormGroup;
  fieldTextType: boolean = false;
  constructor(private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private clientService: ClientService,
    private toastr: ToastrService) {
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
            freeStateRegistration: [response.freeStateRegistration, Validators.required],
          });
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
      bitrhDate: new Date(formData.bitrhDate).toISOString(),
      type: Number(formData.type)
    };
    return data;
  }

  cancel(): void {
    this.router.navigate(['/client/list']);
  }
}
