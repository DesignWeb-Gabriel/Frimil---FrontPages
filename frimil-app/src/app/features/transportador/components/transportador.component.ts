import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TransportadorService } from '../services/transportador.service';
import { TransportadorForm } from '../models/transportador.model';

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
  selector: 'app-transportador',
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
      pageTitle="Transportador"
      pageIcon="truck"
      [actions]="pageActions"
    >
      <!-- Formulário -->
      <div class="form-container">
        <form
          [formGroup]="transportadorForm"
          (ngSubmit)="onSubmit()"
          class="transportador-form"
        >
          <div class="row">
            <!-- Coluna Esquerda -->
            <div class="col">
              <app-form-field
                label="Razão Social *"
                type="text"
                icon="building"
                placeholder="Razão social da empresa"
                formControlName="razaoSocial"
                [hasError]="isFieldInvalid('razaoSocial')"
                errorMessage="Razão social é obrigatória"
              ></app-form-field>

              <app-form-field
                label="Nome Fantasia *"
                type="text"
                icon="store"
                placeholder="Nome fantasia"
                formControlName="nomeFantasia"
                [hasError]="isFieldInvalid('nomeFantasia')"
                errorMessage="Nome fantasia é obrigatório"
              ></app-form-field>

              <app-form-field
                label="CNPJ *"
                type="text"
                icon="credit-card"
                placeholder="00.000.000/0000-00"
                formControlName="cnpj"
                [hasError]="isFieldInvalid('cnpj')"
                errorMessage="CNPJ é obrigatório"
              ></app-form-field>

              <app-form-field
                label="Inscrição Estadual *"
                type="text"
                icon="file-text"
                placeholder="Inscrição estadual"
                formControlName="inscricaoEstadual"
                [hasError]="isFieldInvalid('inscricaoEstadual')"
                errorMessage="Inscrição estadual é obrigatória"
              ></app-form-field>

              <app-form-field
                label="Inscrição Municipal"
                type="text"
                icon="file-text"
                placeholder="Inscrição municipal"
                formControlName="inscricaoMunicipal"
                [hasError]="isFieldInvalid('inscricaoMunicipal')"
                errorMessage="Inscrição municipal inválida"
              ></app-form-field>

              <app-form-field
                label="Telefone *"
                type="text"
                icon="phone"
                placeholder="(00) 0000-0000"
                formControlName="telefone"
                [hasError]="isFieldInvalid('telefone')"
                errorMessage="Telefone é obrigatório"
              ></app-form-field>
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
                label="Email *"
                type="email"
                icon="mail"
                placeholder="exemplo@email.com"
                formControlName="email"
                [hasError]="isFieldInvalid('email')"
                errorMessage="Email válido é obrigatório"
              ></app-form-field>
            </div>
          </div>

          <!-- Segunda linha - Dados do Responsável -->
          <div class="row">
            <div class="col">
              <app-form-field
                label="Responsável *"
                type="text"
                icon="user"
                placeholder="Nome do responsável"
                formControlName="responsavel"
                [hasError]="isFieldInvalid('responsavel')"
                errorMessage="Responsável é obrigatório"
              ></app-form-field>

              <app-form-field
                label="CPF do Responsável *"
                type="text"
                icon="credit-card"
                placeholder="000.000.000-00"
                formControlName="cpfResponsavel"
                [hasError]="isFieldInvalid('cpfResponsavel')"
                errorMessage="CPF do responsável é obrigatório"
              ></app-form-field>

              <app-form-field
                label="Telefone do Responsável *"
                type="text"
                icon="phone"
                placeholder="(00) 00000-0000"
                formControlName="telefoneResponsavel"
                [hasError]="isFieldInvalid('telefoneResponsavel')"
                errorMessage="Telefone do responsável é obrigatório"
              ></app-form-field>
            </div>

            <div class="col">
              <app-form-field
                label="Tipo de Transporte *"
                type="select"
                icon="truck"
                placeholder="Selecione o tipo"
                formControlName="tipoTransporte"
                [options]="tipoTransporteOptions"
                [hasError]="isFieldInvalid('tipoTransporte')"
                errorMessage="Tipo de transporte é obrigatório"
              ></app-form-field>

              <app-form-field
                label="Capacidade de Carga *"
                type="number"
                icon="weight"
                placeholder="0.00"
                formControlName="capacidadeCarga"
                [hasError]="isFieldInvalid('capacidadeCarga')"
                errorMessage="Capacidade de carga é obrigatória"
              ></app-form-field>

              <app-form-field
                label="Unidade de Carga *"
                type="select"
                icon="ruler"
                placeholder="Selecione a unidade"
                formControlName="unidadeCarga"
                [options]="unidadeCargaOptions"
                [hasError]="isFieldInvalid('unidadeCarga')"
                errorMessage="Unidade de carga é obrigatória"
              ></app-form-field>
            </div>
          </div>

          <!-- Terceira linha - Veículos e Certificações -->
          <div class="row">
            <div class="col">
              <app-form-field
                label="Veículos"
                type="textarea"
                icon="truck"
                placeholder="Formato: Placa,Modelo,Ano,Capacidade,Tipo,Status;Placa2,Modelo2,Ano2,Capacidade2,Tipo2,Status2"
                formControlName="veiculos"
                [textareaRows]="4"
                [hasError]="isFieldInvalid('veiculos')"
                errorMessage="Formato de veículos inválido"
              ></app-form-field>
            </div>

            <div class="col">
              <app-form-field
                label="Certificações"
                type="text"
                icon="award"
                placeholder="ANTT, SIF, MAPA, etc."
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
              placeholder="Informações adicionais sobre o transportador..."
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
              [disabled]="transportadorForm.invalid || isSubmitting"
            >
              {{ isSubmitting ? 'Salvando...' : 'Salvar Transportador' }}
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

  transportadorForm: FormGroup;
  tipoTransporteOptions: SelectOption[] = [
    { value: 'Rodoviário', label: 'Rodoviário' },
    { value: 'Ferroviário', label: 'Ferroviário' },
    { value: 'Fluvial', label: 'Fluvial' },
    { value: 'Multimodal', label: 'Multimodal' },
  ];
  unidadeCargaOptions: SelectOption[] = [
    { value: 'toneladas', label: 'Toneladas' },
    { value: 'quilos', label: 'Quilos' },
    { value: 'litros', label: 'Litros' },
  ];
  isSubmitting = false;
  feedbackMessage = '';
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private transportadorService: TransportadorService,
    private navigationService: NavigationService
  ) {
    this.transportadorForm = this.fb.group({
      razaoSocial: ['', [Validators.required, Validators.minLength(3)]],
      nomeFantasia: ['', [Validators.required, Validators.minLength(3)]],
      cnpj: ['', [Validators.required, Validators.minLength(14)]],
      inscricaoEstadual: ['', [Validators.required]],
      inscricaoMunicipal: [''],
      endereco: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cep: ['', [Validators.pattern(/^\d{5}-?\d{3}$/)]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      responsavel: ['', [Validators.required]],
      cpfResponsavel: ['', [Validators.required, Validators.minLength(11)]],
      telefoneResponsavel: ['', [Validators.required]],
      tipoTransporte: ['', [Validators.required]],
      capacidadeCarga: [0, [Validators.required, Validators.min(0)]],
      unidadeCarga: ['', [Validators.required]],
      veiculos: [''],
      certificacoes: [''],
      observacoes: [''],
    });
  }

  ngOnInit(): void {
    this.navigationService.navigateToPage('Transportador', '/transportador');
  }

  onSubmit(): void {
    if (this.transportadorForm.valid) {
      this.isSubmitting = true;
      const formData: TransportadorForm = this.transportadorForm.value;

      // Converter certificações de string para array
      if (typeof formData.certificacoes === 'string') {
        formData.certificacoes = formData.certificacoes
          .split(',')
          .map((cert: string) => cert.trim())
          .filter((cert: string) => cert.length > 0);
      }

      this.transportadorService.createTransportador(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.isSuccess = response.success;
          this.feedbackMessage = response.message || '';

          if (response.success) {
            this.transportadorForm.reset();
            setTimeout(() => {
              this.feedbackMessage = '';
            }, 3000);
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.isSuccess = false;
          this.feedbackMessage = 'Erro ao cadastrar transportador. Tente novamente.';
          console.error('Erro ao cadastrar transportador:', error);
        },
      });
    }
  }

  onCancel(): void {
    this.transportadorForm.reset();
    this.feedbackMessage = '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.transportadorForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onFilter(): void {
    console.log('Filtrar transportadores');
  }

  onSort(): void {
    console.log('Ordenar transportadores');
  }

  onAddTransportador(): void {
    console.log('Adicionar novo transportador');
  }
}
