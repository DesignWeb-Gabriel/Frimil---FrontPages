import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PecuaristaService } from '../services/pecuarista.service';
import { PecuaristaForm } from '../models/pecuarista.model';

import { NavigationService } from '../../../services/navigation.service';
import {
  BaseLayoutComponent,
  ActionButton,
} from '../../../shared/components/base-layout/base-layout.component';
import {
  FormFieldComponent,
  SelectOption,
} from '../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-pecuarista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BaseLayoutComponent,
    FormFieldComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-base-layout
      pageTitle="Pecuarista"
      pageIcon="user"
      [actions]="pageActions"
    >
      <!-- Formulário -->
      <div class="form-container">
        <form
          [formGroup]="pecuaristaForm"
          (ngSubmit)="onSubmit()"
          class="pecuarista-form"
        >
          <div class="row">
            <!-- Coluna Esquerda -->
            <div class="col">
              <app-form-field
                label="Nome Completo *"
                type="text"
                icon="user"
                placeholder="Digite o nome completo"
                formControlName="nomeCompleto"
                [hasError]="isFieldInvalid('nomeCompleto')"
                errorMessage="Nome completo é obrigatório"
              ></app-form-field>

              <app-form-field
                label="Email *"
                type="email"
                icon="mail"
                placeholder="exemplo@email.com"
                formControlName="email"
                [hasError]="isFieldInvalid('email')"
                errorMessage="Email válido é obrigatório"
              ></app-form-field>

              <app-form-field
                label="Fazenda"
                type="select"
                icon="house"
                placeholder="Selecione uma fazenda"
                formControlName="fazenda"
                [options]="fazendaOptions"
                [hasError]="isFieldInvalid('fazenda')"
                errorMessage="Fazenda é obrigatória"
              ></app-form-field>
            </div>

            <!-- Coluna Direita -->
            <div class="col">
              <app-form-field
                label="CPF/CNPJ *"
                type="text"
                icon="credit-card"
                placeholder="000.000.000-00/00"
                formControlName="cpfCnpj"
                [hasError]="isFieldInvalid('cpfCnpj')"
                errorMessage="CPF/CNPJ é obrigatório"
              ></app-form-field>

              <app-form-field
                label="CEP"
                type="text"
                icon="map-pin"
                placeholder="00000-000"
                formControlName="cep"
                [hasError]="isFieldInvalid('cep')"
                errorMessage="CEP deve ter formato válido"
              ></app-form-field>

              <app-form-field
                label="Estado"
                type="text"
                icon="map"
                placeholder="Belém/Pará"
                formControlName="estado"
                [hasError]="isFieldInvalid('estado')"
                errorMessage="Estado é obrigatório"
              ></app-form-field>
            </div>
          </div>

          <!-- Campo Observações - Largura Total -->
          <div class="full-width-field">
            <app-form-field
              label="Observações"
              type="textarea"
              icon="file-text"
              placeholder="Informações adicionais sobre o pecuarista..."
              formControlName="observacoes"
              [textareaRows]="4"
              [hasError]="isFieldInvalid('observacoes')"
              errorMessage="Observações são obrigatórias"
            ></app-form-field>
          </div>

          <!-- Botões de ação -->
          <div class="form-actions">
            <button type="button" class="btn btn-cancel" (click)="onCancel()">
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-submit"
              [class.loading]="isSubmitting"
              [disabled]="pecuaristaForm.invalid || isSubmitting"
            >
              {{ isSubmitting ? 'Salvando...' : 'Salvar Pecuarista' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Feedback de sucesso/erro -->
      <div class="feedback" *ngIf="feedbackMessage">
        <div
          class="feedback-message"
          [class.success]="isSuccess"
          [class.error]="!isSuccess"
        >
          {{ feedbackMessage }}
        </div>
      </div>
    </app-base-layout>
  `,
  styleUrls: ['./pecuarista.component.scss'],
})
export class PecuaristaComponent implements OnInit {
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
      label: 'Adicionar Pesquisa',
      icon: 'plus',
      type: 'secondary',
      action: () => this.onAddPesquisa(),
    },
  ];

  pecuaristaForm: FormGroup;
  fazendas: string[] = [];
  fazendaOptions: SelectOption[] = [];
  isSubmitting = false;
  feedbackMessage = '';
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private pecuaristaService: PecuaristaService,
    private navigationService: NavigationService
  ) {
    this.pecuaristaForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpfCnpj: ['', [Validators.required, Validators.minLength(11)]],
      cep: ['', [Validators.pattern(/^\d{5}-?\d{3}$/)]],
      estado: [''],
      fazenda: [''],
      observacoes: [''],
    });
  }

  ngOnInit(): void {
    // Atualizar breadcrumb para a página atual
    this.navigationService.navigateToPage('Pecuarista', '/pecuarista');

    this.loadFazendas();
    // Removido loadExampleData() - campos começam vazios
  }

  loadFazendas(): void {
    this.pecuaristaService.getFazendas().subscribe({
      next: (fazendas) => {
        this.fazendas = fazendas;
        this.fazendaOptions = fazendas.map((fazenda) => ({
          value: fazenda,
          label: fazenda,
        }));
      },
      error: (error) => {
        console.error('Erro ao carregar fazendas:', error);
        // Fallback para dados de exemplo
        this.fazendas = ['Fazenda Silva', 'Fazenda Três Corações'];
        this.fazendaOptions = this.fazendas.map((fazenda) => ({
          value: fazenda,
          label: fazenda,
        }));
      },
    });
  }

  loadExampleData(): void {
    // Carregar dados de exemplo
    this.pecuaristaForm.patchValue({
      nomeCompleto: 'Pedro Alvares Cabral',
      email: 'Email@email.com',
      cpfCnpj: '000.000.000-00/00',
      cep: '00000-000',
      estado: 'Belém/Pará',
      fazenda: 'Fazenda Silva',
      observacoes: 'Informações adicionais sobre o pecuarista...',
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.pecuaristaForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {
    if (this.pecuaristaForm.valid) {
      this.isSubmitting = true;
      this.feedbackMessage = '';

      const formData: PecuaristaForm = this.pecuaristaForm.value;

      this.pecuaristaService.createPecuarista(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.isSuccess = true;
          this.feedbackMessage = 'Pecuarista cadastrado com sucesso!';
          this.pecuaristaForm.reset();
          this.loadExampleData(); // Recarregar dados de exemplo

          // Limpar mensagem após 3 segundos
          setTimeout(() => {
            this.feedbackMessage = '';
          }, 3000);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.isSuccess = false;
          this.feedbackMessage =
            error.message || 'Erro ao cadastrar pecuarista. Tente novamente.';

          // Limpar mensagem após 5 segundos
          setTimeout(() => {
            this.feedbackMessage = '';
          }, 5000);
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.pecuaristaForm.reset();
    this.feedbackMessage = '';
  }

  onPreviousRouteClick(): void {
    // Lógica adicional se necessário quando clicar no breadcrumb
    console.log('Navegando para rota anterior');
  }

  // Métodos para as ações do header
  onFilter(): void {
    console.log('Filtrar pecuaristas');
    // Implementar lógica de filtro
  }

  onSort(): void {
    console.log('Ordenar pecuaristas');
    // Implementar lógica de ordenação
  }

  onAddPesquisa(): void {
    console.log('Adicionar nova pesquisa');
    // Implementar lógica para adicionar nova pesquisa
  }

  private markFormGroupTouched(): void {
    Object.keys(this.pecuaristaForm.controls).forEach((key) => {
      const control = this.pecuaristaForm.get(key);
      control?.markAsTouched();
    });
  }
}
