import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from '../../../components/side-menu/side-menu.component';
import { TimeStepComponent } from '../../../components/time-step/time-step.component';
import { PageHeaderComponent } from '../page-header/page-header.component';

export interface ActionButton {
  label: string;
  icon: string;
  type: 'outline' | 'secondary' | 'primary';
  action: () => void;
}

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [
    CommonModule,
    SideMenuComponent,
    TimeStepComponent,
    PageHeaderComponent,
  ],
  template: `
    <div class="layout">
      <app-side-menu></app-side-menu>

      <div class="main-content">
        <div class="container">
          <app-time-step></app-time-step>

          <app-page-header 
            [title]="pageTitle"
            [icon]="pageIcon"
            [actions]="actions">
          </app-page-header>

          <!-- Conteúdo da página -->
          <div class="page-content">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent {
  @Input() pageTitle: string = '';
  @Input() pageIcon: string = '';
  @Input() actions: ActionButton[] = [];
}
