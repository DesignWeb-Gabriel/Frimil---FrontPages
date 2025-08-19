import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { BaseLayoutComponent, ActionButton } from '../../shared/components/base-layout/base-layout.component';

@Component({
  selector: 'app-fazenda',
  standalone: true,
  imports: [
    CommonModule,
    BaseLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-base-layout 
      pageTitle="Fazenda" 
      pageIcon="house"
      [actions]="pageActions">
      
      <!-- Formulário -->
      <div class="form-container">
        <div class="form-card">
          <h2>Gerenciamento de Fazendas</h2>
          <p>Página para cadastro e gerenciamento de fazendas.</p>
          <p>Funcionalidade em desenvolvimento...</p>
        </div>
      </div>
    </app-base-layout>
  `,
  styleUrls: ['./fazenda.component.scss'],
})
export class FazendaComponent implements OnInit {
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
      label: 'Adicionar Fazenda',
      icon: 'plus',
      type: 'secondary',
      action: () => this.onAddFazenda(),
    },
  ];

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    // Atualizar breadcrumb para a página atual
    this.navigationService.navigateToPage('Fazenda', '/fazenda');
  }

  // Métodos para as ações do header
  onFilter(): void {
    console.log('Filtrar fazendas');
    // Implementar lógica de filtro
  }

  onSort(): void {
    console.log('Ordenar fazendas');
    // Implementar lógica de ordenação
  }

  onAddFazenda(): void {
    console.log('Adicionar nova fazenda');
    // Implementar lógica para adicionar nova fazenda
  }
}
