import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private breadcrumbSubject = new BehaviorSubject<BreadcrumbItem[]>([
    { label: 'Menu Principal', path: '/', isActive: false },
    { label: 'Dashboard', path: '/dashboard', isActive: true },
  ]);

  public breadcrumb$: Observable<BreadcrumbItem[]> =
    this.breadcrumbSubject.asObservable();

  constructor() {}

  updateBreadcrumb(items: BreadcrumbItem[]): void {
    this.breadcrumbSubject.next(items);
  }

  navigateToPage(pageName: string, pagePath: string): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      { label: 'Menu Principal', path: '/', isActive: false },
      { label: pageName, path: pagePath, isActive: true },
    ];
    this.updateBreadcrumb(breadcrumbItems);
  }

  getCurrentBreadcrumb(): BreadcrumbItem[] {
    return this.breadcrumbSubject.value;
  }
}
