# FRIMIL - Sistema de Gestão Pecuária

<div align="center">
  <img src="public/Logo.svg" alt="FRIMIL Logo" width="200"/>
  <h3>Sistema Completo de Gestão Pecuária</h3>
</div>

## 📋 Descrição

O **FRIMIL** é um sistema moderno de gestão pecuária desenvolvido em **Angular 20**, focado na gestão integrada de pecuaristas, fazendas, pesadores de gado e transportadores. O sistema oferece uma interface intuitiva e responsiva para otimizar os processos da cadeia pecuária.

## 🚀 Tecnologias Utilizadas

### Frontend

- **Angular 20.1.3** - Framework principal
- **TypeScript 5.8.2** - Linguagem de programação
- **Angular Material 20.1.3** - Componentes de UI
- **RxJS 7.8.0** - Programação reativa
- **SCSS** - Estilização avançada
- **Angular SSR** - Server-Side Rendering

### Ferramentas de Desenvolvimento

- **Angular CLI 20.1.3** - Ferramentas de desenvolvimento
- **Karma & Jasmine** - Testes unitários
- **Express 5.1.0** - Servidor de desenvolvimento

## 📁 Estrutura do Projeto

```
frimil-app/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── icons/
│   │   │   ├── side-menu/
│   │   │   └── time-step/
│   │   ├── core/               # Serviços centrais e interceptors
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── services/
│   │   ├── features/           # Módulos de funcionalidades
│   │   │   ├── dashboard/
│   │   │   ├── pecuarista/
│   │   │   ├── fazenda/
│   │   │   ├── pesador-gado/
│   │   │   ├── transportador/
│   │   │   ├── profile/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── settings/
│   │   ├── models/             # Interfaces e tipos
│   │   └── shared/             # Componentes compartilhados
│   ├── environments/           # Configurações de ambiente
│   └── styles.scss            # Estilos globais
├── public/                    # Assets estáticos
├── angular.json              # Configuração do Angular
├── package.json              # Dependências
└── tsconfig.json            # Configuração TypeScript
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- **Node.js** 18+ (recomendado: 20.x)
- **npm** ou **yarn**
- **Git**

### Instalação Rápida

```bash
# 1. Clonar o repositório
git clone <repository-url>
cd frimil-app

# 2. Instalar dependências
npm install

# 3. Executar em modo de desenvolvimento
npm start
```

### Comandos Disponíveis

```bash
# Desenvolvimento
npm start                    # Executar servidor de desenvolvimento
npm run build               # Build para produção
npm run watch               # Build em modo watch

# Testes
npm test                    # Executar testes unitários
npm run test:watch          # Testes em modo watch

# Produção
npm run build:prod          # Build otimizado para produção
npm run serve:ssr           # Executar com SSR
```

### Acesso à Aplicação

- **Desenvolvimento**: http://localhost:4200
- **SSR**: http://localhost:4000

## 🏗️ Arquitetura

### Padrões Utilizados

- **Feature-based Architecture** - Organização modular por funcionalidades
- **Lazy Loading** - Carregamento sob demanda para otimização
- **State Management** - Gerenciamento de estado reativo com RxJS
- **Componentes Standalone** - Angular 20 moderno sem NgModules
- **Server-Side Rendering (SSR)** - Melhor SEO e performance

### Serviços Principais

- `AppStateService` - Gerenciamento de estado global da aplicação
- `AuthService` - Autenticação e autorização de usuários
- `LoadingService` - Controle centralizado de loading
- `NotificationService` - Sistema de notificações
- `NavigationService` - Gerenciamento de navegação

### Interceptors

- `ErrorInterceptor` - Tratamento centralizado de erros HTTP
- `LoadingInterceptor` - Controle automático de loading nas requisições

### Guards

- `AuthGuard` - Proteção de rotas autenticadas

## 📋 Funcionalidades

### 🎯 Dashboard

- Visão geral do sistema com métricas em tempo real
- Gráficos e estatísticas de performance
- Acesso rápido às principais funcionalidades
- Notificações e alertas importantes

### 👥 Gestão de Pecuaristas

- Cadastro completo de pecuaristas
- Edição e atualização de informações
- Listagem com filtros avançados
- Histórico de atividades

### 🏡 Gestão de Fazendas

- Cadastro de propriedades rurais
- Informações detalhadas de localização
- Controle de área e capacidade
- Mapeamento geográfico

### ⚖️ Gestão de Pesadores

- Cadastro de pesadores de gado
- Controle de responsabilidades
- Histórico de pesagens
- Relatórios de performance

### 🚛 Gestão de Transportadores

- Cadastro de transportadores
- Informações de veículos e capacidade
- Controle de rotas e entregas
- Histórico de transportes

### 👤 Perfil do Usuário

- Dados pessoais e configurações
- Preferências de sistema
- Histórico de atividades
- Configurações de segurança

## 🔧 Configuração

### Ambientes

- **Desenvolvimento**: `src/environments/environment.ts`
- **Produção**: `src/environments/environment.prod.ts`

### Variáveis de Ambiente

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api",
  appName: "FRIMIL",
  version: "1.0.0",
};
```

## 🧪 Testes

### Testes Unitários

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

### Estrutura de Testes

```
src/
├── app/
│   └── features/
│       └── pecuarista/
│           └── services/
│               └── pecuarista.service.spec.ts
```

## 📦 Build e Deploy

### Build de Desenvolvimento

```bash
npm run build
```

### Build de Produção

```bash
npm run build --configuration production
```

### Deploy com SSR

```bash
npm run build
npm run serve:ssr:frimil-app
```

## 🔗 Integração com Backend

Para informações detalhadas sobre a integração com o backend, consulte o documento:
**[BACKEND_SPECIFICATIONS.md](./BACKEND_SPECIFICATIONS.md)**

### APIs Necessárias

- Autenticação (JWT)
- CRUD de Pecuaristas
- CRUD de Fazendas
- CRUD de Pesadores
- CRUD de Transportadores
- Dashboard e Métricas

## 📚 Documentação Adicional

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Documentação detalhada da arquitetura
- **[BACKEND_SPECIFICATIONS.md](./BACKEND_SPECIFICATIONS.md)** - Especificações para o backend

## 🤝 Contribuição

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um **Pull Request**

### Padrões de Código

- Seguir o **Angular Style Guide**
- Usar **TypeScript** com tipagem forte
- Implementar **testes unitários**
- Documentar **interfaces** e **serviços**

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- **Email**: suporte@frimil.com.br
- **Issues**: [GitHub Issues](link-para-issues)
- **Documentação**: [Wiki do Projeto](link-para-wiki)

## 🔄 Changelog

### v1.0.0 (Dezembro 2024)

- ✅ Implementação inicial do sistema
- ✅ Arquitetura baseada em features
- ✅ Componentes standalone (Angular 20)
- ✅ Lazy loading implementado
- ✅ State management com RxJS
- ✅ Sistema de autenticação
- ✅ Interceptors para tratamento de erros e loading
- ✅ Server-Side Rendering (SSR)
- ✅ Angular Material UI
- ✅ Sistema de notificações
- ✅ Guards de rota
- ✅ Estrutura de testes

### Próximas Versões

- 🔄 Testes E2E
- 🔄 PWA (Progressive Web App)
- 🔄 Internacionalização (i18n)
- 🔄 Cache e otimizações
- 🔄 Dashboard avançado com gráficos
- 🔄 Relatórios em PDF
- 🔄 Integração com APIs externas

---

<div align="center">
  <p>Desenvolvido com ❤️ pela equipe FRIMIL</p>
  <p><strong>Versão atual:</strong> 1.0.0 | <strong>Última atualização:</strong> Dezembro 2024</p>
</div>
