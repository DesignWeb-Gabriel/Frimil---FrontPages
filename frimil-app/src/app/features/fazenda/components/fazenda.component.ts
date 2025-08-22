import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FazendaService } from '../services/fazenda.service';
import { FazendaForm } from '../models/fazenda.model';

import { NavigationService } from '../../../core/services/navigation.service';
import {
  BaseLayoutComponent,
  ActionButton,
} from '../../../shared/components/base-layout/base-layout.component';
import {
  FormFieldComponent,
  SelectOption,
} from '../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-fazenda',
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
      pageTitle="Fazenda"
      pageIcon="home"
      [actions]="pageActions"
    >
      <!-- Formulário -->
      <div class="form-container">
        <form
          [formGroup]="fazendaForm"
          (ngSubmit)="onSubmit()"
          class="fazenda-form"
        >
          <div class="row">
            <!-- Coluna Esquerda -->
            <div class="col">
              <app-form-field
                label="Nome da Fazenda *"
                type="text"
                icon="home"
                placeholder="Digite o nome da fazenda"
                formControlName="nomeFazenda"
                [hasError]="isFieldInvalid('nomeFazenda')"
                errorMessage="Nome da fazenda é obrigatório"
              ></app-form-field>

              <app-form-field
                label="Proprietário *"
                type="text"
                icon="user"
                placeholder="Nome do proprietário"
                formControlName="proprietario"
                [hasError]="isFieldInvalid('proprietario')"
                errorMessage="Proprietário é obrigatório"
              ></app-form-field>

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
                label="Inscrição Estadual"
                type="text"
                icon="file-text"
                placeholder="Inscrição estadual"
                formControlName="inscricaoEstadual"
                [hasError]="isFieldInvalid('inscricaoEstadual')"
                errorMessage="Inscrição estadual inválida"
              ></app-form-field>

              <app-form-field
                label="Telefone *"
                type="text"
                icon="phone"
                placeholder="(00) 00000-0000"
                formControlName="telefone"
                [hasError]="isFieldInvalid('telefone')"
                errorMessage="Telefone é obrigatório"
              ></app-form-field>

              <!-- <app-form-field
                label="Email"
                type="email"
                icon="mail"
                placeholder="exemplo@email.com"
                formControlName="email"
                [hasError]="isFieldInvalid('email')"
                errorMessage="Email inválido"
              ></app-form-field> -->
            </div>

            <!-- Coluna Direita -->
            <div class="col">
              <app-form-field
                label="Endereço *"
                type="text"
                icon="map-pin"
                placeholder="Endereço completo"
                formControlName="endereco"
                [hasError]="isFieldInvalid('endereco')"
                errorMessage="Endereço é obrigatório"
              ></app-form-field>

              <app-form-field
                label="Cidade *"
                type="text"
                icon="map-pin"
                placeholder="Nome da cidade"
                formControlName="cidade"
                [hasError]="isFieldInvalid('cidade')"
                errorMessage="Cidade é obrigatória"
              ></app-form-field>

              <app-form-field
                label="Estado *"
                type="text"
                icon="map"
                placeholder="Estado"
                formControlName="estado"
                [hasError]="isFieldInvalid('estado')"
                errorMessage="Estado é obrigatório"
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
                label="Tipo de Propriedade *"
                type="select"
                icon="home"
                placeholder="Selecione o tipo"
                formControlName="tipoPropriedade"
                [options]="tipoPropriedadeOptions"
                [hasError]="isFieldInvalid('tipoPropriedade')"
                errorMessage="Tipo de propriedade é obrigatório"
              ></app-form-field>
            </div>
          </div>

          <!-- Segunda linha - Dados da Propriedade -->
          <div class="row">
            <div class="col">
              <app-form-field
                label="Área Total (hectares) *"
                type="number"
                icon="ruler"
                placeholder="0.00"
                formControlName="areaTotal"
                [hasError]="isFieldInvalid('areaTotal')"
                errorMessage="Área total é obrigatória"
              ></app-form-field>

              <app-form-field
                label="Área de Pastagem (hectares) *"
                type="number"
                icon="grass"
                placeholder="0.00"
                formControlName="areaPastagem"
                [hasError]="isFieldInvalid('areaPastagem')"
                errorMessage="Área de pastagem é obrigatória"
              ></app-form-field>
            </div>

            <div class="col">
              <app-form-field
                label="Capacidade do Rebanho *"
                type="number"
                icon="cow"
                placeholder="Número de cabeças"
                formControlName="capacidadeRebanho"
                [hasError]="isFieldInvalid('capacidadeRebanho')"
                errorMessage="Capacidade do rebanho é obrigatória"
              ></app-form-field>

              <app-form-field
                label="Certificações"
                type="text"
                icon="award"
                placeholder="SISBOV, GAP, etc."
                formControlName="certificacoes"
                [hasError]="isFieldInvalid('certificacoes')"
                errorMessage="Certificações inválidas"
              ></app-form-field>
            </div>
          </div>

          <!-- Campo Observações - Largura Total -->
          <div class="full-width-field">
            <app-form-field
              label="Observações"
              type="textarea"
              icon="file-text"
              placeholder="Informações adicionais sobre a fazenda..."
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
              [disabled]="fazendaForm.invalid || isSubmitting"
            >
              {{ isSubmitting ? 'Salvando...' : 'Salvar Fazenda' }}
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

  fazendaForm: FormGroup;
  tipoPropriedadeOptions: SelectOption[] = [
    { value: 'Própria', label: 'Própria' },
    { value: 'Arrendada', label: 'Arrendada' },
    { value: 'Parceria', label: 'Parceria' },
  ];
  isSubmitting = false;
  feedbackMessage = '';
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private fazendaService: FazendaService,
    private navigationService: NavigationService
  ) {
    this.fazendaForm = this.fb.group({
      nomeFazenda: ['', [Validators.required, Validators.minLength(3)]],
      proprietario: ['', [Validators.required, Validators.minLength(3)]],
      cpfCnpj: ['', [Validators.required, Validators.minLength(11)]],
      inscricaoEstadual: [''],
      endereco: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cep: ['', [Validators.pattern(/^\d{5}-?\d{3}$/)]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.email]],
      areaTotal: [0, [Validators.required, Validators.min(0)]],
      areaPastagem: [0, [Validators.required, Validators.min(0)]],
      capacidadeRebanho: [0, [Validators.required, Validators.min(0)]],
      tipoPropriedade: ['', [Validators.required]],
      certificacoes: [''],
      observacoes: [''],
    });
  }

  ngOnInit(): void {
    this.navigationService.navigateToPage('Fazenda', '/fazenda');
  }

  onSubmit(): void {
    if (this.fazendaForm.valid) {
      this.isSubmitting = true;
      const formData: FazendaForm = this.fazendaForm.value;

      // Converter certificações de string para array
      if (typeof formData.certificacoes === 'string') {
        formData.certificacoes = formData.certificacoes
          .split(',')
          .map((cert: string) => cert.trim())
          .filter((cert: string) => cert.length > 0);
      }

      this.fazendaService.createFazenda(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.isSuccess = response.success;
          this.feedbackMessage = response.message || '';

          if (response.success) {
            this.fazendaForm.reset();
            setTimeout(() => {
              this.feedbackMessage = '';
            }, 3000);
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.isSuccess = false;
          this.feedbackMessage = 'Erro ao cadastrar fazenda. Tente novamente.';
          console.error('Erro ao cadastrar fazenda:', error);
        },
      });
    }
  }

  onCancel(): void {
    this.fazendaForm.reset();
    this.feedbackMessage = '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.fazendaForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onFilter(): void {
    console.log('Filtrar fazendas');
  }

  onSort(): void {
    console.log('Ordenar fazendas');
  }

  onAddFazenda(): void {
    console.log('Adicionar nova fazenda');
  }
}
