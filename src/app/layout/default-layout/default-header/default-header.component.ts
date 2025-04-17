import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  AvatarComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  SidebarToggleDirective
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { AuthService } from '../../../services/auth.services';
import { User } from '../../../models/auth/login-response.model';

@Component({
    selector: 'app-default-header',
    templateUrl: './default-header.component.html',
  imports: [ContainerComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent,  NgTemplateOutlet, DropdownComponent, DropdownToggleDirective,  DropdownMenuDirective, DropdownItemDirective]
})
export class DefaultHeaderComponent extends HeaderComponent {

  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  user: User | null = null;

  readonly colorModes = [
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilMoon';
  });

  constructor(private authService : AuthService) {
    super();
  }

  
  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log(this.user)
  }


  sidebarId = input('sidebar1');

  logout():void{
    this.authService.logout();
    
  }

}
