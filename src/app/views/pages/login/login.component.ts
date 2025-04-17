import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { AuthService } from '../../../services/auth.services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppToastComponent } from '../../notifications/toasters/toast-simple/toast.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone:true,
    imports: [ToasterComponent,FormsModule,ReactiveFormsModule,ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective,]
})
export class LoginComponent {
  
  placement = ToasterPlacement.TopEnd;
  fieldTextType: boolean = false;

  @ViewChildren(ToasterComponent) viewChildren!: QueryList<ToasterComponent>;
  
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
   }
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  loginUser(): void {
    const { login, password } = this.loginForm.value;
    this.authService.login(login, password).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.addToast();
        console.log(error);
      },
    });
  }
  addToast() {
     const toasterPosition = this.viewChildren.filter(item => item.placement === this.placement);
     toasterPosition.forEach((item) => {
       const title = `Usuário e/ou senha inválidos`;
      //  const { position, ...props } = { title, position:  this.placement };
       const componentRef = item.addToast(AppToastComponent, { title: 'Erro',message: title, position:  this.placement, color: 'danger', delay:2000 }, {});
       componentRef.instance['closeButton'] = true;
     });
   }
}
