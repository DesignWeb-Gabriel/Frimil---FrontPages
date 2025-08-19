# FRIMIL - Sistema de Gestão Pecuária

## Descrição

O FRIMIL é um sistema de gestão pecuária desenvolvido em Angular 20, focado na gestão de pecuaristas, fazendas, pesadores de gado e transportadores.

## 🚀 Tecnologias

- **Angular 20** - Framework principal
- **TypeScript** - Linguagem de programação
- **Angular Material** - Componentes de UI
- **RxJS** - Programação reativa
- **SCSS** - Estilização

## 📁 Estrutura do Projeto

```
src/app/
├── components/          # Componentes reutilizáveis
├── core/               # Serviços centrais e interceptors
├── features/           # Módulos de funcionalidades
│   ├── dashboard/
│   ├── pecuarista/
│   ├── fazenda/
│   ├── pesador-gado/
│   ├── transportador/
│   └── profile/
├── models/             # Interfaces e tipos
├── shared/             # Componentes compartilhados
└── services/           # Serviços de negócio
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm start

# Build para produção
npm run build

# Executar testes
npm test
```

## 🏗️ Arquitetura

### Padrões Utilizados
- **Feature-based Architecture** - Organização por funcionalidades
- **Lazy Loading** - Carregamento sob demanda
- **State Management** - Gerenciamento de estado com RxJS
- **Componentes Standalone** - Angular 20 moderno

### Serviços Principais
- `AppStateService` - Gerenciamento de estado global
- `AuthService` - Autenticação e autorização
- `LoadingService` - Controle de loading
- `NotificationService` - Notificações

### Interceptors
- `ErrorInterceptor` - Tratamento de erros HTTP
- `LoadingInterceptor` - Controle automático de loading

## 📋 Funcionalidades

### Dashboard
- Visão geral do sistema
- Métricas e estatísticas
- Acesso rápido às funcionalidades

### Gestão de Pecuaristas
- Cadastro de pecuaristas
- Edição de informações
- Listagem e busca

### Gestão de Fazendas
- Cadastro de fazendas
- Informações de propriedade
- Área e localização

### Gestão de Pesadores
- Cadastro de pesadores de gado
- Controle de responsabilidades
- Histórico de pesagens

### Gestão de Transportadores
- Cadastro de transportadores
- Informações de veículos
- Capacidade de carga

### Perfil do Usuário
- Dados pessoais
- Configurações
- Preferências

## 🔧 Configuração

### Ambientes
- **Desenvolvimento**: `environment.ts`
- **Produção**: `environment.prod.ts`

### Variáveis de Ambiente
- `apiUrl` - URL da API
- `appName` - Nome da aplicação
- `version` - Versão atual

## 🧪 Testes

### Testes Unitários
```bash
npm test
```

### Testes E2E
```bash
npm run e2e
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

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@frimil.com.br ou abra uma issue no repositório.

## 🔄 Changelog

### v1.0.0
- Implementação inicial do sistema
- Arquitetura baseada em features
- Componentes standalone
- Lazy loading implementado
- State management com RxJS
- Sistema de autenticação
- Interceptors para tratamento de erros e loading
