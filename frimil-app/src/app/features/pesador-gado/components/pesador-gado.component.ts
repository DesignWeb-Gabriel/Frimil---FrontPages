import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PesadorGadoService } from '../services/pesador-gado.service';
import { PesadorGadoForm } from '../models/pesador-gado.model';

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
  selector: 'app-pesador-gado',
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
      pageTitle="Pesador de Gado"
      pageIcon="scale"
      [actions]="pageActions"
    >
      <!-- Formulário -->
      <div class="form-container">
        <form
          [formGroup]="pesadorForm"
          (ngSubmit)="onSubmit()"
          class="pesador-form"
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
                label="CPF *"
                type="text"
                icon="credit-card"
                placeholder="000.000.000-00"
                formControlName="cpf"
                [hasError]="isFieldInvalid('cpf')"
                errorMessage="CPF é obrigatório"
              ></app-form-field>

              <app-form-field
                label="RG *"
                type="text"
                icon="id-card"
                placeholder="00.000.000-0"
                formControlName="rg"
                [hasError]="isFieldInvalid('rg')"
                errorMessage="RG é obrigatório"
              ></app-form-field>

              <app-form-field
                label="Data de Nascimento *"
                type="date"
                icon="calendar"
                placeholder="dd/mm/aaaa"
                formControlName="dataNascimento"
                [hasError]="isFieldInvalid('dataNascimento')"
                errorMessage="Data de nascimento é obrigatória"
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

              <app-form-field
                label="Email"
                type="email"
                icon="mail"
                placeholder="exemplo@email.com"
                formControlName="email"
                [hasError]="isFieldInvalid('email')"
                errorMessage="Email inválido"
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
                label="Cargo *"
                type="text"
                icon="briefcase"
                placeholder="Cargo/função"
                formControlName="cargo"
                [hasError]="isFieldInvalid('cargo')"
                errorMessage="Cargo é obrigatório"
              ></app-form-field>
            </div>
          </div>

          <!-- Segunda linha - Dados Profissionais -->
          <div class="row">
            <div class="col">
              <app-form-field
                label="Registro Profissional *"
                type="text"
                icon="file-text"
                placeholder="Número do registro"
                formControlName="registroProfissional"
                [hasError]="isFieldInvalid('registroProfissional')"
                errorMessage="Registro profissional é obrigatório"
              ></app-form-field>

              <app-form-field
                label="Data de Admissão *"
                type="date"
                icon="calendar"
                placeholder="dd/mm/aaaa"
                formControlName="dataAdmissao"
                [hasError]="isFieldInvalid('dataAdmissao')"
                errorMessage="Data de admissão é obrigatória"
              ></app-form-field>

              <app-form-field
                label="Salário *"
                type="number"
                icon="dollar-sign"
                placeholder="0.00"
                formControlName="salario"
                [hasError]="isFieldInvalid('salario')"
                errorMessage="Salário é obrigatório"
              ></app-form-field>
            </div>

            <div class="col">
              <app-form-field
                label="Turno *"
                type="select"
                icon="clock"
                placeholder="Selecione o turno"
                formControlName="turno"
                [options]="turnoOptions"
                [hasError]="isFieldInvalid('turno')"
                errorMessage="Turno é obrigatório"
              ></app-form-field>

              <app-form-field
                label="Especializações"
                type="text"
                icon="award"
                placeholder="Pesagem de Bovinos, Controle de Qualidade, etc."
                formControlName="especializacoes"
                [hasError]="isFieldInvalid('especializacoes')"
                errorMessage="Especializações inválidas"
              ></app-form-field>

              <app-form-field
                label="Certificações"
                type="text"
                icon="certificate"
                placeholder="Certificação MAPA, Treinamento SIF, etc."
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
              placeholder="Informações adicionais sobre o pesador..."
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
              [disabled]="pesadorForm.invalid || isSubmitting"
            >
              {{ isSubmitting ? 'Salvando...' : 'Salvar Pesador' }}
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
      label: 'Adicionar Pesador',
      icon: 'plus',
      type: 'secondary',
      action: () => this.onAddPesador(),
    },
  ];

  pesadorForm: FormGroup;
  turnoOptions: SelectOption[] = [
    { value: 'Manhã', label: 'Manhã' },
    { value: 'Tarde', label: 'Tarde' },
    { value: 'Noite', label: 'Noite' },
    { value: 'Integral', label: 'Integral' },
  ];
  isSubmitting = false;
  feedbackMessage = '';
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private pesadorService: PesadorGadoService,
    private navigationService: NavigationService
  ) {
    this.pesadorForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      rg: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.email]],
      endereco: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cep: ['', [Validators.pattern(/^\d{5}-?\d{3}$/)]],
      cargo: ['', [Validators.required]],
      registroProfissional: ['', [Validators.required]],
      dataAdmissao: ['', [Validators.required]],
      salario: [0, [Validators.required, Validators.min(0)]],
      turno: ['', [Validators.required]],
      especializacoes: [''],
      certificacoes: [''],
      observacoes: [''],
    });
  }

  ngOnInit(): void {
    this.navigationService.navigateToPage('Pesador de Gado', '/pesador-gado');
  }

  onSubmit(): void {
    if (this.pesadorForm.valid) {
      this.isSubmitting = true;
      const formData: PesadorGadoForm = this.pesadorForm.value;

      // Converter especializações de string para array
      if (typeof formData.especializacoes === 'string') {
        formData.especializacoes = formData.especializacoes
          .split(',')
          .map((esp: string) => esp.trim())
          .filter((esp: string) => esp.length > 0);
      }

      // Converter certificações de string para array
      if (typeof formData.certificacoes === 'string') {
        formData.certificacoes = formData.certificacoes
          .split(',')
          .map((cert: string) => cert.trim())
          .filter((cert: string) => cert.length > 0);
      }

      this.pesadorService.createPesador(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.isSuccess = response.success;
          this.feedbackMessage = response.message || '';

          if (response.success) {
            this.pesadorForm.reset();
            setTimeout(() => {
              this.feedbackMessage = '';
            }, 3000);
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.isSuccess = false;
          this.feedbackMessage = 'Erro ao cadastrar pesador. Tente novamente.';
          console.error('Erro ao cadastrar pesador:', error);
        },
      });
    }
  }

  onCancel(): void {
    this.pesadorForm.reset();
    this.feedbackMessage = '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.pesadorForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onFilter(): void {
    console.log('Filtrar pesadores');
  }

  onSort(): void {
    console.log('Ordenar pesadores');
  }

  onAddPesador(): void {
    console.log('Adicionar novo pesador');
  }
}
