import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvatarComponent, TableModule } from '@coreui/angular';
import { GenericPaginationComponent } from '../generic-pagination/generic-pagination.component';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'app-generic-table',
  imports: [TableModule,CommonModule, GenericPaginationComponent,AvatarComponent, FormsModule, CurrencyMaskModule],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss'
})
export class GenericTableComponent implements OnInit {
  @Input() columns: any[] = []; // Colunas da tabela
  // @Input() columns: Array<{ key: string; label: string }> = []; // Definição de colunas
  @Input() data: any[] = []; // Dados da tabela
  @Input() totalRecords = 0; // Total de registros para paginação
  @Input() rowsPerPage = 10; // Registros por página
  @Input() buttons: { label: string; class: string; action: string, icon: string }[] = [];
  @Input() currentPage = 1

  @Output() buttonClick = new EventEmitter<{ action: string; row: any }>();
  @Output() valueChange = new EventEmitter<{ row: any; key: string; value: any }>(); // Para capturar alterações no input

  @Output() pageChange = new EventEmitter<number>(); // Evento para alterar página
  // currentPage = 1; // Página atual
  constructor() {}

  ngOnInit(): void {
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(page);
  }
  onButtonClick(action: string, row: any) {
    this.buttonClick.emit({ action, row });
  }

  onInputChange(row: any, key: string): void {
    const value = row[key];
    this.valueChange.emit({ row, key, value }); // Emite o valor alterado para o componente pai
  }
}
