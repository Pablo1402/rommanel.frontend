import { Component } from '@angular/core';
import { AlertComponent, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormModule, GridModule, SpinnerModule } from '@coreui/angular';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { IconModule } from '@coreui/icons-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchClientResponseModel } from '../../../models/Client/client.model';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.services';

@Component({
  selector: 'app-client-list',
  imports: [CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    GenericTableComponent,
    FormModule,
    ButtonDirective,
    GridModule,
    IconModule,
    AlertComponent,
    SpinnerModule,
    ReactiveFormsModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {


  columns = [
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Telefone' },
    { key: 'document', label: 'Documento' },
  ];

  buttons = [
    { label: 'Editar', class: 'btn-light', action: 'edit', icon: 'cil-save' },
  ];

  dataTable: SearchClientResponseModel[] = [];
  totalRecords = 0;
  pageSize = 10;
  isLoading = false;
  currentPage = 1;
  form: FormGroup;

  constructor(private clientService: ClientService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.getClients(1, this.pageSize, null);
    let startIndex = (1 - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;
    this.dataTable = this.dataTable.slice(startIndex, endIndex);
  }

  new(): void {
    this.router.navigate(['client/new']);
  }
  search(value: string): void {
    if (value.trim()) {
      this.getClients(1, this.pageSize, value);
    } else {
      this.getClients(1, this.pageSize, null);
    }
  }

  private getClients(pageIndex: number | null, pageSize: number | null, search: string | null): void {
    this.isLoading = true;
    this.clientService.getClients(pageIndex, pageSize, search)
      .subscribe({
        next: (response) => {
          if (response.data) {
            this.dataTable = response.data.map(client => ({
              ...client,
            }));
            this.totalRecords = response.totalItens;
            this.isLoading = false;
          }
          else {
            this.dataTable = []
            this.totalRecords = 0;
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        },
      });

  }

  handleButtonClick(event: { action: string; row: any }) {
    const { action, row } = event;
    if (action === 'edit') {
      this.router.navigate(['client/edit/' + row.id]);
    } else if (action === 'delete') {
      console.log('Excluir:', row);
    }
  }
  onPageChanged(page: number): void {
    const formValue = this.form.value;
    this.currentPage = page;
    this.getClients(page, this.pageSize, formValue.productName ?? null);
  }

}
