import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../core/services/navigation.service';
import { BaseLayoutComponent, ActionButton } from '../../../shared/components/base-layout/base-layout.component';

@Component({
  selector: 'app-transportador',
  standalone: true,
  imports: [CommonModule, BaseLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-base-layout 
      pageTitle="Transportador" 
      pageIcon="truck"
      [actions]="pageActions">
      
      <!-- Formulário -->
      <div class="form-container">
        <div class="form-card">
          <h2>Gerenciamento de Transportadores</h2>
          <p>Página para cadastro e gerenciamento de transportadores.</p>
          <p>Funcionalidade em desenvolvimento...</p>
        </div>
      </div>
    </app-base-layout>
  `,
  styleUrls: ['./transportador.component.scss'],
})
export class TransportadorComponent implements OnInit {
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
      label: 'Adicionar Transportador',
      icon: 'plus',
      type: 'secondary',
      action: () => this.onAddTransportador(),
    },
  ];

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    // Atualizar breadcrumb para a página atual
    this.navigationService.navigateToPage('Transportador', '/transportador');
  }

  // Métodos para as ações do header
  onFilter(): void {
    console.log('Filtrar transportadores');
    // Implementar lógica de filtro
  }

  onSort(): void {
    console.log('Ordenar transportadores');
    // Implementar lógica de ordenação
  }

  onAddTransportador(): void {
    console.log('Adicionar novo transportador');
    // Implementar lógica para novo transportador
  }
}
