import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from '../../../shared/components/base-layout/base-layout.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { IconComponent } from '../../../components/icons/icon.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, BaseLayoutComponent, PageHeaderComponent, IconComponent],
  template: `
    <app-base-layout>
      <app-page-header
        title="Configurações"
        subtitle="Gerencie suas preferências e obtenha ajuda"
        icon="settings"
      ></app-page-header>

      <div class="settings-container">
        <!-- Seção FAQ -->
        <div class="settings-section">
          <h2 class="section-title">
            <app-icon name="help-circle" class="section-icon"></app-icon>
            Perguntas Frequentes (FAQ)
          </h2>
          
          <div class="faq-list">
            <div class="faq-item" *ngFor="let item of faqItems; trackBy: trackByFaq">
              <button 
                class="faq-question" 
                (click)="toggleFaq(item)"
                [attr.aria-expanded]="item.isOpen"
              >
                <span>{{ item.question }}</span>
                <app-icon 
                  [name]="item.isOpen ? 'chevron-up' : 'chevron-down'" 
                  class="faq-icon"
                ></app-icon>
              </button>
              <div class="faq-answer" [class.open]="item.isOpen">
                <p>{{ item.answer }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Seção Contato -->
        <div class="settings-section">
          <h2 class="section-title">
            <app-icon name="phone" class="section-icon"></app-icon>
            Contato e Suporte
          </h2>
          
          <div class="contact-grid">
            <div class="contact-card">
              <div class="contact-icon">
                <app-icon name="phone" class="icon"></app-icon>
              </div>
              <div class="contact-info">
                <h3>Telefone</h3>
                <p>(11) 9999-9999</p>
                <span class="contact-note">Segunda a Sexta, 8h às 18h</span>
              </div>
            </div>

            <div class="contact-card">
              <div class="contact-icon">
                <app-icon name="mail" class="icon"></app-icon>
              </div>
              <div class="contact-info">
                <h3>E-mail</h3>
                <p>suporte@frimil.com.br</p>
                <span class="contact-note">Resposta em até 24h</span>
              </div>
            </div>

            <div class="contact-card">
              <div class="contact-icon">
                <app-icon name="map-pin" class="icon"></app-icon>
              </div>
              <div class="contact-info">
                <h3>Endereço</h3>
                <p>Rua das Indústrias, 123</p>
                <span class="contact-note">São Paulo - SP</span>
              </div>
            </div>

            <div class="contact-card">
              <div class="contact-icon">
                <app-icon name="clock" class="icon"></app-icon>
              </div>
              <div class="contact-info">
                <h3>Horário de Funcionamento</h3>
                <p>Segunda a Sexta</p>
                <span class="contact-note">8h às 18h</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Seção Informações do Sistema -->
        <div class="settings-section">
          <h2 class="section-title">
            <app-icon name="info" class="section-icon"></app-icon>
            Informações do Sistema
          </h2>
          
          <div class="system-info">
            <div class="info-item">
              <span class="info-label">Versão do Sistema:</span>
              <span class="info-value">1.0.0</span>
            </div>
            <div class="info-item">
              <span class="info-label">Última Atualização:</span>
              <span class="info-value">{{ lastUpdate | date:'dd/MM/yyyy' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Desenvolvido por:</span>
              <span class="info-value">Equipe Frimil</span>
            </div>
          </div>
        </div>
      </div>
    </app-base-layout>
  `,
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  lastUpdate = new Date('2024-01-15');

  faqItems = [
    {
      id: 1,
      question: 'Como cadastrar um novo pecuarista?',
      answer: 'Para cadastrar um novo pecuarista, acesse a seção "Pecuarista" no menu lateral e clique no botão "Novo Cadastro". Preencha todos os campos obrigatórios e clique em "Salvar".',
      isOpen: false
    },
    {
      id: 2,
      question: 'Como exportar dados para planilha?',
      answer: 'Na página de listagem de qualquer módulo, você encontrará um botão "Exportar" no canto superior direito. Clique nele para baixar os dados em formato Excel.',
      isOpen: false
    },
    {
      id: 3,
      question: 'Como alterar minha senha?',
      answer: 'Acesse "Meu Perfil" no menu do usuário e clique na aba "Segurança". Lá você poderá alterar sua senha atual.',
      isOpen: false
    },
    {
      id: 4,
      question: 'O sistema funciona offline?',
      answer: 'Não, o sistema requer conexão com a internet para funcionar corretamente, pois os dados são sincronizados com o servidor em tempo real.',
      isOpen: false
    },
    {
      id: 5,
      question: 'Como solicitar suporte técnico?',
      answer: 'Entre em contato através do telefone (11) 9999-9999 ou envie um e-mail para suporte@frimil.com.br. Nossa equipe está disponível de segunda a sexta, das 8h às 18h.',
      isOpen: false
    },
    {
      id: 6,
      question: 'Posso acessar o sistema de qualquer dispositivo?',
      answer: 'Sim, o sistema é responsivo e pode ser acessado de computadores, tablets e smartphones através de qualquer navegador web moderno.',
      isOpen: false
    }
  ];

  toggleFaq(item: any): void {
    item.isOpen = !item.isOpen;
  }

  trackByFaq(index: number, item: any): number {
    return item.id;
  }
}
