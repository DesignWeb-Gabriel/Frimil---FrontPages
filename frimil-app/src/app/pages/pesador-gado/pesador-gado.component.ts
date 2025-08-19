import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import {
  BaseLayoutComponent,
  ActionButton,
} from '../../shared/components/base-layout/base-layout.component';

@Component({
  selector: 'app-pesador-gado',
  standalone: true,
  imports: [CommonModule, BaseLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-base-layout
      pageTitle="Pesador de Gado"
      pageIcon="scale"
      [actions]="pageActions"
    >
      <!-- Formulário -->
      <div class="form-container">
        <div class="form-card">
          <h2>Sistema de Pesagem</h2>
          <p>Página para gerenciamento do sistema de pesagem de gado.</p>
          <p>Funcionalidade em desenvolvimento...</p>
        </div>
      </div>
    </app-base-layout>
  `,
  styleUrls: ['./pesador-gado.component.scss'],
})
export class PesadorGadoComponent implements OnInit {
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
      label: 'Nova Pesagem',
      icon: 'plus',
      type: 'secondary',
      action: () => this.onNovaPesagem(),
    },
  ];

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    // Atualizar breadcrumb para a página atual
    this.navigationService.navigateToPage('Pesador de Gado', '/pesador-gado');
  }

  // Métodos para as ações do header
  onFilter(): void {
    console.log('Filtrar pesagens');
    // Implementar lógica de filtro
  }

  onSort(): void {
    console.log('Ordenar pesagens');
    // Implementar lógica de ordenação
  }

  onNovaPesagem(): void {
    console.log('Adicionar nova pesagem');
    // Implementar lógica para nova pesagem
  }
}
