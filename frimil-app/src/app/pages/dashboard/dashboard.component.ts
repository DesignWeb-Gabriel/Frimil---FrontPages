import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { IconComponent } from '../../components/icons/icon.component';
import { BaseLayoutComponent, ActionButton } from '../../shared/components/base-layout/base-layout.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseLayoutComponent,
    IconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-base-layout 
      pageTitle="Dashboard" 
      pageIcon="dashboard"
      [actions]="pageActions">
      
      <!-- Conteúdo do Dashboard -->
      <div class="dashboard-content">
        <div class="welcome-card">
          <h2>Bem-vindo ao FRIMIL</h2>
          <p>Sistema de gerenciamento para pecuaristas, fazendas e transportadores.</p>
          
          <div class="quick-actions">
            <h3>Ações Rápidas:</h3>
            <div class="action-grid">
              <div class="action-item" (click)="navigateTo('/pecuarista')">
                <app-icon name="user" class="action-icon"></app-icon>
                <span>Cadastrar Pecuarista</span>
              </div>
              <div class="action-item" (click)="navigateTo('/fazenda')">
                <app-icon name="house" class="action-icon"></app-icon>
                <span>Gerenciar Fazendas</span>
              </div>
              <div class="action-item" (click)="navigateTo('/pesador-gado')">
                <app-icon name="scale" class="action-icon"></app-icon>
                <span>Pesador de Gado</span>
              </div>
              <div class="action-item" (click)="navigateTo('/transportador')">
                <app-icon name="truck" class="action-icon"></app-icon>
                <span>Transportadores</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-base-layout>
  `,
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  pageActions: ActionButton[] = [
    {
      label: 'Filtrar',
      icon: 'search',
      type: 'outline',
      action: () => this.onFilter(),
    },
    {
      label: 'Ordenar',
      icon: 'arrow-up-down',
      type: 'outline',
      action: () => this.onSort(),
    },
    {
      label: 'Nova Ação',
      icon: 'plus',
      type: 'secondary',
      action: () => this.onNewAction(),
    },
  ];

  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Atualizar breadcrumb para a página atual
    this.navigationService.navigateToPage('Dashboard', '/dashboard');
  }

  navigateTo(route: string): void {
    // Mapear rotas para nomes de página
    const pageNames: { [key: string]: string } = {
      '/pecuarista': 'Pecuarista',
      '/fazenda': 'Fazenda',
      '/pesador-gado': 'Pesador de Gado',
      '/transportador': 'Transportador',
      '/dashboard': 'Dashboard'
    };

    const pageName = pageNames[route] || 'Página';
    
    // Atualizar breadcrumb antes de navegar
    this.navigationService.navigateToPage(pageName, route);
    
    // Navegar para a rota
    this.router.navigate([route]);
  }

  // Métodos para as ações do header
  onFilter(): void {
    console.log('Filtrar dashboard');
    // Implementar lógica de filtro
  }

  onSort(): void {
    console.log('Ordenar dashboard');
    // Implementar lógica de ordenação
  }

  onNewAction(): void {
    console.log('Nova ação');
    // Implementar nova ação
  }
}
