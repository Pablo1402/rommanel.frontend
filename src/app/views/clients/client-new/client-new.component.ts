import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormModule, GridModule } from '@coreui/angular';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../../services/client.services';
import { CreateClientRequestModel } from '../../../models/Client/client.model';

@Component({
  selector: 'app-client-new',
  imports: [CardBodyComponent,
    CardComponent,
    ReactiveFormsModule,
    CardHeaderComponent,
    FormModule,
    ButtonDirective,
    GridModule],
  templateUrl: './client-new.component.html',
  styleUrl: './client-new.component.scss'
})
export class ClientNewComponent {
  clientForm: FormGroup;
  fieldTextType: boolean = false;
  constructor(private fb: FormBuilder,
    private router: Router,
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

  save(): void {
    this.clientService.saveClient(this.prepareUserData(this.clientForm.value)).subscribe({
      next: (response) => {
        this.toastr.success(`Cliente salvo!`, 'Cliente');
        this.router.navigate(['/client/list']);
      },
      error: (error) => {
        this.toastr.error('Erro ao adicionar cliente!', 'Novo Cliente')
        console.log(error);
      },
    });
  }

   prepareUserData(formData: CreateClientRequestModel): CreateClientRequestModel {
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

    onInput(event: any) {
      const inputValue = event.target.value;
      event.target.value = inputValue.replace(/[^0-9]/g, '');
    }
}
