import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NavigationService } from '../../../core/services/navigation.service';
import {
  BaseLayoutComponent,
  ActionButton,
} from '../../../shared/components/base-layout/base-layout.component';
import {
  FormFieldComponent,
  SelectOption,
} from '../../../shared/components/form-field/form-field.component';

interface UserProfile {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  cargo: string;
  telefone: string;
  avatarUrl?: string;
  iniciais: string;
}

@Component({
  selector: 'app-profile',
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
      pageTitle="Meu Perfil"
      pageIcon="user"
      [actions]="pageActions"
    >
      <div class="profile-container">
        <!-- Seção do Avatar -->
        <div class="avatar-section">
          <div class="avatar-container">
            <div class="avatar-preview" [class.has-image]="profileImageUrl">
              <img
                *ngIf="profileImageUrl"
                [src]="profileImageUrl"
                alt="Foto de perfil"
                class="avatar-image"
              />
              <span *ngIf="!profileImageUrl" class="avatar-initials">
                {{ currentUser.iniciais }}
              </span>
            </div>
            <div class="avatar-actions">
              <label for="avatar-upload" class="upload-btn">
                <span>Alterar Foto</span>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                (change)="onImageUpload($event)"
                style="display: none;"
              />
              <button
                *ngIf="profileImageUrl"
                class="remove-btn"
                (click)="removeProfileImage()"
                type="button"
              >
                <i class="remove-icon">🗑️</i>
                <span>Remover</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Formulário de Perfil -->
        <div class="form-section">
          <form
            [formGroup]="profileForm"
            (ngSubmit)="onSubmit()"
            class="profile-form"
          >
            <div class="form-row">
              <!-- Nome -->
              <app-form-field
                label="Nome *"
                type="text"
                icon="user"
                placeholder="Digite seu nome"
                formControlName="nome"
                [hasError]="isFieldInvalid('nome')"
                errorMessage="Nome é obrigatório"
              ></app-form-field>

              <!-- Sobrenome -->
              <app-form-field
                label="Sobrenome *"
                type="text"
                icon="user"
                placeholder="Digite seu sobrenome"
                formControlName="sobrenome"
                [hasError]="isFieldInvalid('sobrenome')"
                errorMessage="Sobrenome é obrigatório"
              ></app-form-field>
            </div>

            <div class="form-row">
              <!-- Email -->
              <app-form-field
                label="Email *"
                type="email"
                icon="mail"
                placeholder="seu@email.com"
                formControlName="email"
                [hasError]="isFieldInvalid('email')"
                errorMessage="Email válido é obrigatório"
              ></app-form-field>

              <!-- Telefone -->
              <app-form-field
                label="Telefone *"
                type="text"
                icon="phone"
                placeholder="(00) 00000-0000"
                formControlName="telefone"
                [hasError]="isFieldInvalid('telefone')"
                errorMessage="Telefone é obrigatório"
              ></app-form-field>
            </div>

            <div class="form-row">
              <!-- Cargo -->
              <app-form-field
                label="Cargo *"
                type="select"
                icon="briefcase"
                placeholder="Selecione seu cargo"
                formControlName="cargo"
                [options]="cargoOptions"
                [hasError]="isFieldInvalid('cargo')"
                errorMessage="Cargo é obrigatório"
              ></app-form-field>
            </div>

            <!-- Botões de Ação -->
            <div class="form-actions">
              <button
                type="button"
                class="btn btn-secondary"
                (click)="onCancel()"
                [disabled]="isSubmitting"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                [class.loading]="isSubmitting"
                [disabled]="profileForm.invalid || isSubmitting"
              >
                {{ isSubmitting ? 'Salvando...' : 'Salvar Perfil' }}
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
      </div>
    </app-base-layout>
  `,
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  pageActions: ActionButton[] = [
    {
      label: 'Editar Perfil',
      icon: 'edit',
      type: 'outline',
      action: () => this.enableEditing(),
    },
    {
      label: 'Alterar Senha',
      icon: 'lock',
      type: 'outline',
      action: () => this.changePassword(),
    },
    {
      label: 'Exportar Dados',
      icon: 'download',
      type: 'outline',
      action: () => this.exportData(),
    },
  ];

  profileForm: FormGroup;
  isSubmitting = false;
  isEditing = false;
  feedbackMessage = '';
  isSuccess = false;
  profileImageUrl: string | null = null;

  currentUser: UserProfile = {
    id: 1,
    nome: 'Felipe',
    sobrenome: 'Admin',
    email: 'mail@example.com',
    cargo: 'Administrador',
    telefone: '(11) 99999-9999',
    iniciais: 'FA',
  };

  cargoOptions: SelectOption[] = [
    { value: 'Administrador', label: 'Administrador' },
    { value: 'Gerente', label: 'Gerente' },
    { value: 'Operador', label: 'Operador' },
    { value: 'Analista', label: 'Analista' },
    { value: 'Supervisor', label: 'Supervisor' },
  ];

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService
  ) {
    this.profileForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      sobrenome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [
        '',
        [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)],
      ],
      cargo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Atualizar breadcrumb para a página atual
    this.navigationService.navigateToPage('Meu Perfil', '/profile');

    // Carregar dados do usuário atual
    this.loadUserProfile();

    // Iniciar com formulário desabilitado (modo visualização)
    this.profileForm.disable();
  }

  loadUserProfile(): void {
    // Simular carregamento de dados do usuário
    this.profileForm.patchValue({
      nome: this.currentUser.nome,
      sobrenome: this.currentUser.sobrenome,
      email: this.currentUser.email,
      telefone: this.currentUser.telefone,
      cargo: this.currentUser.cargo,
    });

    // Carregar imagem de perfil se existir
    this.profileImageUrl = this.currentUser.avatarUrl || null;
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        this.showFeedback(
          'Por favor, selecione apenas arquivos de imagem.',
          false
        );
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.showFeedback('A imagem deve ter no máximo 5MB.', false);
        return;
      }

      // Criar URL para preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageUrl = e.target.result;
        this.showFeedback('Imagem carregada com sucesso!', true);
      };
      reader.readAsDataURL(file);
    }
  }

  removeProfileImage(): void {
    this.profileImageUrl = null;
    this.showFeedback('Imagem removida.', true);
  }

  enableEditing(): void {
    this.isEditing = true;
    this.profileForm.enable();
    this.showFeedback(
      'Modo de edição ativado. Você pode alterar seus dados agora.',
      true
    );
  }

  changePassword(): void {
    // Implementar mudança de senha
    console.log('Abrindo modal de mudança de senha');
    this.showFeedback(
      'Funcionalidade de mudança de senha será implementada.',
      false
    );
  }

  exportData(): void {
    // Implementar exportação de dados
    console.log('Exportando dados do perfil');
    this.showFeedback('Dados exportados com sucesso!', true);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isSubmitting = true;

      // Simular envio para API
      setTimeout(() => {
        const formData = this.profileForm.value;

        // Atualizar dados do usuário
        this.currentUser = {
          ...this.currentUser,
          ...formData,
          avatarUrl: this.profileImageUrl,
        };

        this.isSubmitting = false;
        this.isEditing = false;
        this.profileForm.disable();

        this.showFeedback('Perfil atualizado com sucesso!', true);
      }, 1500);
    }
  }

  onCancel(): void {
    // Restaurar dados originais
    this.loadUserProfile();
    this.isEditing = false;
    this.profileForm.disable();
    this.showFeedback('Alterações canceladas.', false);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  showFeedback(message: string, isSuccess: boolean): void {
    this.feedbackMessage = message;
    this.isSuccess = isSuccess;

    // Limpar feedback após 5 segundos
    setTimeout(() => {
      this.feedbackMessage = '';
    }, 5000);
  }
}
