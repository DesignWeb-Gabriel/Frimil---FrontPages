import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../components/icons/icon.component';

export interface PageAction {
  label: string;
  icon: string;
  type: 'outline' | 'secondary' | 'primary';
  action: () => void;
  disabled?: boolean;
}

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-header">
      <div class="page-title">
        <app-icon [name]="icon" class="title-icon" *ngIf="icon"></app-icon>
        <h1>{{ title }}</h1>
      </div>

      <div class="action-buttons" *ngIf="actions.length > 0">
        <button 
          *ngFor="let action of actions"
          [class]="'btn btn-' + action.type"
          [disabled]="action.disabled"
          (click)="action.action()">
          <app-icon [name]="action.icon" class="btn-icon"></app-icon>
          {{ action.label }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() actions: PageAction[] = [];
}
