# Arquitetura do Projeto FRIMIL

## Visão Geral

O projeto FRIMIL é uma aplicação Angular 20 que segue uma arquitetura modular baseada em features, utilizando componentes standalone e lazy loading para otimização de performance.

## Estrutura de Pastas

```
src/app/
├── components/          # Componentes reutilizáveis globais
│   ├── icons/
│   ├── side-menu/
│   └── time-step/
├── core/               # Serviços e funcionalidades centrais
│   ├── guards/         # Guards de rota
│   ├── interceptors/   # Interceptors HTTP
│   └── services/       # Serviços globais
├── features/           # Módulos de funcionalidades
│   ├── dashboard/
│   ├── pecuarista/
│   ├── fazenda/
│   ├── pesador-gado/
│   ├── transportador/
│   └── profile/
├── models/             # Interfaces e tipos centralizados
├── shared/             # Componentes compartilhados
│   └── components/
└── services/           # Serviços de negócio (legado)
```

## Padrões Arquiteturais

### 1. Feature-based Architecture
Cada feature contém:
- `components/` - Componentes específicos da feature
- `models/` - Interfaces e tipos da feature
- `services/` - Serviços específicos da feature
- `*.routes.ts` - Configuração de rotas da feature

### 2. State Management
- Utiliza `AppStateService` com RxJS BehaviorSubject
- Padrão Observable para reatividade
- Centralização do estado da aplicação

### 3. Lazy Loading
- Todas as features são carregadas sob demanda
- Otimização de performance e bundle size
- Rotas configuradas com `loadChildren`

### 4. Componentes Standalone
- Angular 20 com componentes standalone
- Sem necessidade de NgModules
- Melhor tree-shaking e performance

## Serviços Principais

### AppStateService
Gerencia o estado global da aplicação:
- Estado dos pecuaristas
- Estado das fazendas
- Estado da UI (menu, página atual)

### AuthService
Gerencia autenticação:
- Login/logout
- Verificação de autenticação
- Gerenciamento de usuário atual

### LoadingService
Gerencia estados de loading:
- Indicadores de carregamento
- Interceptor HTTP para loading automático

### NotificationService
Gerencia notificações:
- Mensagens de sucesso/erro
- Toasts e alerts

## Interceptors

### ErrorInterceptor
- Tratamento centralizado de erros HTTP
- Redirecionamento automático em caso de erro 401/403
- Logging de erros

### LoadingInterceptor
- Controle automático de loading
- Integração com LoadingService
- Exclusão de URLs específicas

## Guards

### AuthGuard
- Proteção de rotas
- Verificação de autenticação
- Redirecionamento para login

## Modelos de Dados

### Interfaces Principais
- `Pecuarista` - Dados do pecuarista
- `Fazenda` - Dados da fazenda
- `PesadorGado` - Dados do pesador
- `Transportador` - Dados do transportador
- `Profile` - Dados do perfil do usuário

### Padrão de Resposta da API
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}
```

## Configuração de Ambiente

### environment.ts (Desenvolvimento)
- API URL local
- Configurações de debug
- Features habilitadas

### environment.prod.ts (Produção)
- API URL de produção
- Configurações otimizadas
- Features de produção

## Boas Práticas

1. **Separação de Responsabilidades**
   - Cada feature é independente
   - Serviços específicos por domínio
   - Componentes reutilizáveis

2. **TypeScript**
   - Interfaces bem definidas
   - Tipagem forte
   - Generics para reutilização

3. **RxJS**
   - Observables para reatividade
   - Operadores para transformação de dados
   - Gerenciamento de estado reativo

4. **Performance**
   - Lazy loading de features
   - OnPush change detection
   - TrackBy functions em loops

5. **Testabilidade**
   - Serviços injetáveis
   - Componentes isolados
   - Mocks para testes

## Convenções de Nomenclatura

- **Componentes**: PascalCase (ex: `DashboardComponent`)
- **Serviços**: PascalCase + Service (ex: `PecuaristaService`)
- **Interfaces**: PascalCase (ex: `Pecuarista`)
- **Arquivos**: kebab-case (ex: `dashboard.component.ts`)
- **Pastas**: kebab-case (ex: `pesador-gado`)

## Próximos Passos

1. Implementar testes unitários
2. Adicionar testes e2e
3. Configurar CI/CD
4. Implementar PWA
5. Adicionar internacionalização
6. Implementar cache de dados
7. Adicionar logging e monitoramento
