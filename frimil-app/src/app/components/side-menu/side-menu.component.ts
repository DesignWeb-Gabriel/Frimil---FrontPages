import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icons/icon.component';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="side-menu">
      <!-- Logo -->
      <div class="logo">
        <svg
          class="logo-image"
          width="337"
          height="108"
          viewBox="0 0 337 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.6607 43.7175V64.2982H4.82471V9.65448H66.8393V23.5426H25.6607V30.1552H49.1225V43.7118H25.6607V43.7175Z"
            fill="white"
          />
          <path
            d="M116.465 64.2968V49.4142C116.465 46.9338 115.478 45.6936 111.378 45.6936H92.7595V64.2911H72.0879V9.6474H117.94C133.36 9.6474 136.723 12.8708 136.723 22.7068V30.8911C136.723 35.6862 134.346 38.3324 130.898 39.3211C134.097 40.0641 137.052 42.7102 137.052 47.1739V64.2854H116.465V64.2968ZM116.465 26.7646C116.465 24.6957 115.892 23.5412 112.529 23.5412H92.7595V33.1314H112.529C116.136 33.1314 116.465 31.8912 116.465 29.4108V26.7646Z"
            fill="white"
          />
          <path
            d="M143.866 64.2973V9.65363H164.537V64.2973H143.866Z"
            fill="white"
          />
          <path
            d="M232.119 64.2973V39.5788L220.964 64.2973H202.509L191.269 39.5788V64.2973H172.401V9.65363H195.613L212.513 43.6309L229.408 9.65363H251.146V64.2973H232.113H232.119Z"
            fill="white"
          />
          <path
            d="M259.029 64.2973V9.65363H279.7V64.2973H259.029Z"
            fill="white"
          />
          <path
            d="M287.564 64.2973V9.65363H308.4V50.4092H336.456V64.2973H287.57H287.564Z"
            fill="white"
          />
          <path d="M337 0H0V3.50347H337V0Z" fill="white" />
          <path d="M337 69.2979H0V72.8013H337V69.2979Z" fill="white" />
          <path
            d="M219.262 78.3739H116.426V107.082H219.262V78.3739Z"
            fill="#EC1C25"
          />
          <path
            d="M128.024 104.641V82.6259H140.036C142.253 82.6259 143.937 83.1517 145.089 84.1976C146.24 85.2435 146.818 86.7524 146.818 88.7127C146.818 89.85 146.608 90.8102 146.189 91.5818C145.769 92.3591 145.219 92.9706 144.544 93.4278C145.469 93.7936 146.211 94.3251 146.767 95.0166C147.323 95.7139 147.595 96.7427 147.595 98.1086C147.595 100.183 146.96 101.789 145.695 102.927C144.431 104.07 142.633 104.635 140.302 104.635H128.024V104.641ZM134.166 91.4103H138.306C139.865 91.4103 140.648 90.7016 140.648 89.29C140.648 88.5813 140.461 88.0497 140.087 87.684C139.712 87.3182 139.066 87.1353 138.136 87.1353H134.166V91.4103ZM134.166 100.16H138.578C139.44 100.16 140.07 99.9775 140.478 99.6118C140.886 99.246 141.09 98.6458 141.09 97.8C141.09 97.0913 140.886 96.5598 140.478 96.194C140.07 95.8282 139.389 95.6453 138.442 95.6453H134.166V100.16Z"
            fill="white"
          />
          <path
            d="M151.668 104.641V82.6259H168.223V87.5468H158.043V91.136H166.964V96.1254H158.043V99.7146H168.223V104.635H151.668V104.641Z"
            fill="white"
          />
          <path
            d="M171.959 104.641V82.6259H188.514V87.5468H178.334V91.136H187.255V96.1254H178.334V99.7146H188.514V104.635H171.959V104.641Z"
            fill="white"
          />
          <path
            d="M192.248 104.641V82.6259H208.666V87.4153H198.623V91.2103H207.373V96.0626H198.623V104.641H192.243H192.248Z"
            fill="white"
          />
        </svg>
      </div>

      <!-- Menu de Navegação -->
      <nav class="nav-menu">
        <a
          class="nav-item"
          [class.active]="isActive('/dashboard')"
          (click)="navigateTo('/dashboard')"
        >
          <app-icon name="dashboard" class="nav-icon"></app-icon>
          <span>Dashboard</span>
        </a>

        <a
          class="nav-item"
          [class.active]="isActive('/pecuarista')"
          (click)="navigateTo('/pecuarista')"
        >
          <app-icon name="user" class="nav-icon"></app-icon>
          <span>Pecuarista</span>
        </a>

        <a
          class="nav-item"
          [class.active]="isActive('/fazenda')"
          (click)="navigateTo('/fazenda')"
        >
          <app-icon name="house" class="nav-icon"></app-icon>
          <span>Fazenda</span>
        </a>

        <a
          class="nav-item"
          [class.active]="isActive('/pesador-gado')"
          (click)="navigateTo('/pesador-gado')"
        >
          <app-icon name="scale" class="nav-icon"></app-icon>
          <span>Pesador de Gado</span>
        </a>

        <a
          class="nav-item"
          [class.active]="isActive('/transportador')"
          (click)="navigateTo('/transportador')"
        >
          <app-icon name="truck" class="nav-icon"></app-icon>
          <span>Transportador</span>
        </a>
      </nav>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Footer do Menu -->
      <div class="menu-footer">
        <div class="user-info">
          <div class="user-avatar">
            <span>{{ currentUser.iniciais }}</span>
          </div>
          <div class="user-details">
            <div class="user-name">{{ currentUser.nome }}</div>
            <div class="user-email">{{ currentUser.email }}</div>
          </div>
          <div class="user-actions" #userActionsRef>
            <button
              class="menu-toggle-btn"
              (click)="toggleUserMenu($event)"
              [attr.aria-expanded]="isUserMenuOpen"
              aria-label="Abrir menu do usuário"
            >
              <app-icon name="more-vertical" class="menu-icon"></app-icon>
            </button>

            <!-- Dropdown Menu -->
            <div
              class="user-dropdown-menu"
              [class.open]="isUserMenuOpen"
              role="menu"
              aria-label="Menu de opções do usuário"
            >
              <button
                class="dropdown-item"
                (click)="openProfile()"
                role="menuitem"
                tabindex="0"
              >
                <app-icon name="user" class="dropdown-icon"></app-icon>
                <span>Meu Perfil</span>
              </button>

              <button
                class="dropdown-item"
                (click)="openSettings()"
                role="menuitem"
                tabindex="0"
              >
                <app-icon name="settings" class="dropdown-icon"></app-icon>
                <span>Configurações</span>
              </button>

              <div class="dropdown-divider" role="separator"></div>

              <button
                class="dropdown-item logout-item"
                (click)="logout()"
                role="menuitem"
                tabindex="0"
              >
                <app-icon name="log-out" class="dropdown-icon"></app-icon>
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  @ViewChild('userActionsRef') userActionsRef!: ElementRef;

  currentUser = {
    id: 1,
    nome: 'Felipe Admin',
    email: 'mail@example.com',
    iniciais: 'FA',
  };

  isUserMenuOpen = false;

  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {}

  navigateTo(route: string): void {
    // Mapear rotas para nomes de página
    const pageNames: { [key: string]: string } = {
      '/pecuarista': 'Pecuarista',
      '/fazenda': 'Fazenda',
      '/pesador-gado': 'Pesador de Gado',
      '/transportador': 'Transportador',
      '/dashboard': 'Dashboard',
    };

    const pageName = pageNames[route] || 'Página';

    // Atualizar breadcrumb antes de navegar
    this.navigationService.navigateToPage(pageName, route);

    // Navegar para a rota
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  toggleUserMenu(event: Event): void {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (
      this.userActionsRef &&
      !this.userActionsRef.nativeElement.contains(event.target)
    ) {
      this.isUserMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.isUserMenuOpen = false;
  }

  openProfile(): void {
    this.isUserMenuOpen = false;
    // Navegar para a página de perfil
    this.router.navigate(['/profile']);
  }

  openSettings(): void {
    this.isUserMenuOpen = false;
    // Implementar navegação para configurações
    console.log('Abrindo configurações');
    // this.router.navigate(['/settings']);
  }

  logout(): void {
    this.isUserMenuOpen = false;
    // Implementar lógica de logout
    console.log('Fazendo logout do usuário');

    // Exemplo de implementação de logout
    if (confirm('Tem certeza que deseja sair?')) {
      // Limpar dados do usuário, tokens, etc.
      localStorage.removeItem('user_token');
      sessionStorage.clear();

      // Redirecionar para página de login
      this.router.navigate(['/login']);
    }
  }
}
