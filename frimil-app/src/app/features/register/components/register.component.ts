import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { IconComponent } from '../../../components/icons/icon.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  template: `
    <div class="register-container">
      <!-- Coluna Esquerda - Formulário -->
      <div class="register-form-section">
        <div class="form-container">
          <!-- Logo -->
          <div class="logo-container">
            <img
              src="/logo-menu-sidebar.svg"
              alt="Frimil Logo"
              class="logo-image"
            />
          </div>

          <!-- Título -->
          <h1 class="register-title">Criar uma nova conta</h1>

          <!-- Formulário -->
          <form
            [formGroup]="registerForm"
            (ngSubmit)="onSubmit()"
            class="register-form"
          >
            <!-- Nome -->
            <div class="form-group">
              <label for="name" class="form-label">Nome Completo</label>
              <div class="input-container">
                <input
                  type="text"
                  id="name"
                  formControlName="name"
                  class="form-input"
                  placeholder="Digite seu nome completo"
                  [class.error]="isFieldInvalid('name')"
                />
                <app-icon name="user" class="input-icon"></app-icon>
              </div>
              <div class="error-message" *ngIf="isFieldInvalid('name')">
                {{ getFieldError('name') }}
              </div>
            </div>

            <!-- Email -->
            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <div class="input-container">
                <input
                  type="email"
                  id="email"
                  formControlName="email"
                  class="form-input"
                  placeholder="alex@email.com"
                  [class.error]="isFieldInvalid('email')"
                />
                <app-icon name="mail" class="input-icon"></app-icon>
              </div>
              <div class="error-message" *ngIf="isFieldInvalid('email')">
                {{ getFieldError('email') }}
              </div>
            </div>

            <!-- Senha -->
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <div class="input-container">
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  id="password"
                  formControlName="password"
                  class="form-input"
                  placeholder="Criar uma senha"
                  [class.error]="isFieldInvalid('password')"
                />
                <button
                  type="button"
                  class="password-toggle"
                  (click)="togglePassword()"
                  [attr.aria-label]="
                    showPassword ? 'Ocultar senha' : 'Mostrar senha'
                  "
                >
                  <app-icon
                    [name]="showPassword ? 'eye-off' : 'eye'"
                    class="input-icon"
                  ></app-icon>
                </button>
              </div>
              <div class="error-message" *ngIf="isFieldInvalid('password')">
                {{ getFieldError('password') }}
              </div>
            </div>

            <!-- Confirmar Senha -->
            <div class="form-group">
              <label for="confirmPassword" class="form-label"
                >Confirmar Password</label
              >
              <div class="input-container">
                <input
                  [type]="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  formControlName="confirmPassword"
                  class="form-input"
                  placeholder="Confirme sua senha"
                  [class.error]="isFieldInvalid('confirmPassword')"
                />
                <button
                  type="button"
                  class="password-toggle"
                  (click)="toggleConfirmPassword()"
                  [attr.aria-label]="
                    showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'
                  "
                >
                  <app-icon
                    [name]="showConfirmPassword ? 'eye-off' : 'eye'"
                    class="input-icon"
                  ></app-icon>
                </button>
              </div>
              <div
                class="error-message"
                *ngIf="isFieldInvalid('confirmPassword')"
              >
                {{ getFieldError('confirmPassword') }}
              </div>
            </div>

            <!-- Botão de Cadastro -->
            <button
              type="submit"
              class="register-button"
              [disabled]="registerForm.invalid || isLoading"
            >
              <span *ngIf="!isLoading">Cadastrar-se</span>
              <span *ngIf="isLoading" class="loading-spinner"></span>
            </button>

            <!-- Separador -->
            <div class="separator">
              <span class="separator-text">OU</span>
            </div>

            <!-- Botão de Login -->
            <button
              type="button"
              class="login-button"
              (click)="goToLogin()"
            >
              Fazer Login
            </button>
          </form>
        </div>
      </div>

      <!-- Coluna Direita - Branding -->
      <div class="branding-section">
        <div class="branding-content">
          <h2 class="branding-title">Carne bovina padrão premium!</h2>

          <!-- Logo Principal -->
          <div class="main-logo">
            <img
              src="/logo-menu-preto.svg"
              alt="Frimil"
              class="main-logo-image"
            />
          </div>

          <!-- Tag do Produto 
          <div class="product-tag">
            <span class="tag-text">BEEF</span>
          </div> -->
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.handleRegister();
    } else {
      this.markFormGroupTouched();
    }
  }

  private handleRegister(): void {
    const { name, email, password } = this.registerForm.value;

    // Simular cadastro - substitua por chamada real à API
    setTimeout(() => {
      this.notificationService.showSuccess(
        'Cadastro realizado com sucesso!',
        'Sua conta foi criada. Faça login para continuar.'
      );
      this.isLoading = false;
      this.router.navigate(['/login']);
    }, 1500);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return 'Este campo é obrigatório.';
      }
      if (field.errors['email']) {
        return 'Digite um email válido.';
      }
      if (field.errors['minlength']) {
        return `Mínimo de ${field.errors['minlength'].requiredLength} caracteres.`;
      }
    }

    // Verificar erro de senhas não coincidem
    if (
      this.registerForm.errors &&
      this.registerForm.errors['passwordMismatch'] &&
      fieldName === 'confirmPassword'
    ) {
      return 'As senhas não coincidem.';
    }

    return '';
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach((key) => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  private passwordMatchValidator(
    form: FormGroup
  ): { [key: string]: any } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
