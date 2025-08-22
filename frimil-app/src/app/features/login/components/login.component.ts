import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { IconComponent } from '../../../components/icons/icon.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  template: `
    <div class="login-container">
      <!-- Coluna Esquerda - Formulário -->
      <div class="login-form-section">
        <div class="form-container">
          <!-- Logo -->
          <div class="logo-container">
            <img src="/logo-menu-sidebar.svg" alt="Frimil Logo" class="logo-image" />
          </div>

          <!-- Título -->
          <h1 class="login-title">Fazer o login com sua conta</h1>

          <!-- Formulário -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
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
                  placeholder="Entrar com sua senha"
                  [class.error]="isFieldInvalid('password')"
                />
                <button
                  type="button"
                  class="password-toggle"
                  (click)="togglePassword()"
                  [attr.aria-label]="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
                >
                  <app-icon [name]="showPassword ? 'eye-off' : 'eye'" class="input-icon"></app-icon>
                </button>
              </div>
              <div class="error-message" *ngIf="isFieldInvalid('password')">
                {{ getFieldError('password') }}
              </div>
            </div>

            <!-- Esqueceu a senha -->
            <div class="forgot-password">
              <a href="#" class="forgot-link">Esqueceu a sua senha?</a>
            </div>

            <!-- Botão de Login -->
            <button
              type="submit"
              class="login-button"
              [disabled]="loginForm.invalid || isLoading"
            >
              <span *ngIf="!isLoading">Login</span>
              <span *ngIf="isLoading" class="loading-spinner"></span>
            </button>

            <!-- Separador -->
            <div class="separator">
              <span class="separator-text">OR</span>
            </div>

            <!-- Botão de Cadastro -->
            <button
              type="button"
              class="register-button"
              (click)="toggleMode()"
            >
              Cadastrar-se
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
            <img src="/logo-menu-preto.svg" alt="Frimil" class="main-logo-image" />
          </div>
          
          <!-- Tag do Produto -->
          <div class="product-tag">
            <span class="tag-text">BEEF</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response.success) {
            this.notificationService.showSuccess(
              'Login realizado com sucesso!',
              'Bem-vindo ao sistema Frimil.'
            );
            this.router.navigate(['/dashboard']);
          } else {
            this.notificationService.showError(
              'Erro no login',
              response.message || 'Credenciais inválidas.'
            );
          }
        },
        error: (error) => {
          this.notificationService.showError(
            'Erro no login',
            'Ocorreu um erro ao fazer login. Tente novamente.'
          );
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    // Aqui você pode implementar a lógica para alternar entre login e cadastro
    this.notificationService.showInfo(
      'Funcionalidade em desenvolvimento',
      'O cadastro de novos usuários será implementado em breve.'
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
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
    return '';
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}
