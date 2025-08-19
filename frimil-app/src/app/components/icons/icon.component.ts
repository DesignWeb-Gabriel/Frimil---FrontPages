import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [class]="className"
      [style.width.px]="size"
      [style.height.px]="size"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24"
      style="display: block; vertical-align: middle;"
    >
      <ng-container [ngSwitch]="name">
        <!-- User Icon -->
        <g *ngSwitchCase="'user'">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </g>

        <!-- Search Icon -->
        <g *ngSwitchCase="'search'">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </g>

        <!-- Arrow Up Down Icon -->
        <g *ngSwitchCase="'arrow-up-down'">
          <path d="m7 15 5-5 5 5"></path>
          <path d="m7 9 5 5 5-5"></path>
        </g>

        <!-- Plus Icon -->
        <g *ngSwitchCase="'plus'">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </g>

        <!-- Mail Icon -->
        <g *ngSwitchCase="'mail'">
          <path
            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
          ></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </g>

        <!-- House Icon -->
        <g *ngSwitchCase="'house'">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9,22 9,12 15,12 15,22"></polyline>
        </g>

        <!-- File Text Icon -->
        <g *ngSwitchCase="'file-text'">
          <path
            d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
          ></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </g>

        <!-- Lock Icon -->
        <g *ngSwitchCase="'lock'">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <circle cx="12" cy="16" r="1"></circle>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </g>

        <!-- Credit Card Icon -->
        <g *ngSwitchCase="'credit-card'">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </g>

        <!-- Map Pin Icon -->
        <g *ngSwitchCase="'map-pin'">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </g>

        <!-- Map Icon -->
        <g *ngSwitchCase="'map'">
          <polygon
            points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2 1,6"
          ></polygon>
          <line x1="8" y1="2" x2="8" y2="18"></line>
          <line x1="16" y1="6" x2="16" y2="22"></line>
        </g>

        <!-- Square Icon (Black Square) -->
        <g *ngSwitchCase="'square'">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            ry="2"
            fill="currentColor"
          ></rect>
        </g>

        <!-- Scale Icon -->
        <g *ngSwitchCase="'scale'">
          <path d="M3 6h18"></path>
          <path d="M3 10h18"></path>
          <path d="M3 14h18"></path>
          <path d="M3 18h18"></path>
        </g>

        <!-- Truck Icon -->
        <g *ngSwitchCase="'truck'">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16,8 20,8 23,11 23,16 16,16 16,8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </g>

        <!-- More Vertical Icon -->
        <g *ngSwitchCase="'more-vertical'">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </g>

        <!-- Dashboard Icon -->
        <g *ngSwitchCase="'dashboard'">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </g>

        <!-- Default case -->
        <g *ngSwitchDefault>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </g>
      </ng-container>
    </svg>
  `,
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: number = 24;
  @Input() className: string = '';
}
