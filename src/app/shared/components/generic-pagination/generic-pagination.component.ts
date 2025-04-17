
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, input } from '@angular/core';
import { PageItemDirective, PaginationComponent } from '@coreui/angular';

@Component({
  selector: 'app-generic-pagination',
  imports: [  CommonModule, PaginationComponent
    ],
  templateUrl: './generic-pagination.component.html',
  styleUrl: './generic-pagination.component.scss'
})
export class GenericPaginationComponent implements OnInit {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  // currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.generatePages();
  }

  generatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
}