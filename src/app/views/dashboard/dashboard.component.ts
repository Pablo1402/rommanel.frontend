import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AlertModule,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TableDirective,
  TemplateIdDirective,
  TextColorDirective,
  WidgetStatAComponent
} from '@coreui/angular';

import { DashboardResponseModel } from '../../models/dashboard/dashboard-response.model';


@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    imports: [CommonModule , RowComponent,  ReactiveFormsModule, RowComponent, AlertModule]
})
export class DashboardComponent implements OnInit {

  constructor() {

  }

  dashboardModel :DashboardResponseModel| null = null;

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);


  
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  ngOnInit(): void {
  }

 


}
