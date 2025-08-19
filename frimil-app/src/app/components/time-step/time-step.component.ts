import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  NavigationService,
  BreadcrumbItem,
} from '../../core/services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-time-step',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="time-step">
      <div class="breadcrumb">
        <ng-container *ngFor="let item of breadcrumbItems; let last = last">
          <span
            class="breadcrumb-item"
            [class.current]="item.isActive"
            [class.clickable]="!item.isActive"
            (click)="!item.isActive && navigateToItem(item)"
          >
            {{ item.label }}
          </span>
          <div class="breadcrumb-icon" *ngIf="!last">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./time-step.component.scss'],
})
export class TimeStepComponent implements OnInit, OnDestroy {
  @Input() previousRoute: string = 'Menu Principal';
  @Input() currentRoute: string = 'Dashboard';
  @Input() previousRoutePath: string = '/';
  @Output() previousRouteClick = new EventEmitter<void>();

  breadcrumbItems: BreadcrumbItem[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    // Usar breadcrumb dinâmico do serviço
    this.subscription.add(
      this.navigationService.breadcrumb$.subscribe((items) => {
        this.breadcrumbItems = items;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateToItem(item: BreadcrumbItem): void {
    this.previousRouteClick.emit();
    this.router.navigate([item.path]);
  }

  navigateToPrevious(): void {
    this.previousRouteClick.emit();
    this.router.navigate([this.previousRoutePath]);
  }
}
