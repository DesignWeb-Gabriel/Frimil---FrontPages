# Especificações para Desenvolvedor Backend - FRIMIL

## 📋 Visão Geral

Este documento contém todas as especificações necessárias para o desenvolvimento do backend do sistema FRIMIL - Sistema de Gestão Pecuária.

## 🚀 Tecnologias Frontend Utilizadas

### Versões Principais

- **Node.js**: 18+ (recomendado: 20.x)
- **Angular**: 20.1.3
- **TypeScript**: 5.8.2
- **Angular Material**: 20.1.3
- **RxJS**: 7.8.0

### Dependências Principais

```json
{
  "@angular/animations": "^20.1.3",
  "@angular/common": "^20.1.3",
  "@angular/compiler": "^20.1.0",
  "@angular/core": "^20.1.0",
  "@angular/forms": "^20.1.3",
  "@angular/material": "^20.1.3",
  "@angular/platform-browser": "^20.1.0",
  "@angular/platform-server": "^20.1.0",
  "@angular/router": "^20.1.0",
  "@angular/ssr": "^20.1.3",
  "express": "^5.1.0",
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0"
}
```

## 🏗️ Arquitetura Frontend

### Estrutura de Features

- **Dashboard**: Visão geral e métricas
- **Pecuarista**: Gestão de pecuaristas
- **Fazenda**: Gestão de fazendas
- **Pesador-Gado**: Gestão de pesadores
- **Transportador**: Gestão de transportadores
- **Profile**: Perfil do usuário
- **Login/Register**: Autenticação

### Padrões Utilizados

- **Feature-based Architecture**
- **Lazy Loading** para otimização
- **State Management** com RxJS
- **Componentes Standalone** (Angular 20)
- **Interceptors** para tratamento de erros e loading

## 🔌 APIs Necessárias

### 1. Autenticação

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET /api/auth/me
POST /api/auth/refresh-token
```

### 2. Pecuaristas

```
GET /api/pecuaristas
GET /api/pecuaristas/:id
POST /api/pecuaristas
PUT /api/pecuaristas/:id
DELETE /api/pecuaristas/:id
GET /api/pecuaristas/:id/fazendas
```

### 3. Fazendas

```
GET /api/fazendas
GET /api/fazendas/:id
POST /api/fazendas
PUT /api/fazendas/:id
DELETE /api/fazendas/:id
GET /api/fazendas/pecuarista/:pecuaristaId
```

### 4. Pesadores de Gado

```
GET /api/pesadores
GET /api/pesadores/:id
POST /api/pesadores
PUT /api/pesadores/:id
DELETE /api/pesadores/:id
GET /api/pesadores/fazenda/:fazendaId
```

### 5. Transportadores

```
GET /api/transportadores
GET /api/transportadores/:id
POST /api/transportadores
PUT /api/transportadores/:id
DELETE /api/transportadores/:id
```

### 6. Dashboard

```
GET /api/dashboard/stats
GET /api/dashboard/recent-activities
GET /api/dashboard/metrics
```

## 📊 Modelos de Dados

### 1. Usuário/Autenticação

```typescript
interface User {
  id: number;
  email: string;
  nome: string;
  tipo: "admin" | "pecuarista" | "pesador" | "transportador";
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface LoginRequest {
  email: string;
  senha: string;
}

interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}
```

### 2. Pecuarista

```typescript
interface Pecuarista {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: {
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 3. Fazenda

```typescript
interface Fazenda {
  id: number;
  nome: string;
  pecuaristaId: number;
  area: number; // em hectares
  endereco: {
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    coordenadas?: {
      latitude: number;
      longitude: number;
    };
  };
  tipo: "bovinos" | "suinos" | "aves" | "outros";
  capacidade: number;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4. Pesador de Gado

```typescript
interface PesadorGado {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  especialidade: string[];
  fazendas: number[]; // IDs das fazendas onde trabalha
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 5. Transportador

```typescript
interface Transportador {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  veiculos: {
    placa: string;
    modelo: string;
    capacidade: number; // em kg
    tipo: "caminhao" | "carreta" | "outro";
  }[];
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔐 Autenticação e Autorização

### JWT Token

- **Algoritmo**: HS256
- **Expiração**: 1 hora
- **Refresh Token**: 7 dias
- **Claims necessários**: userId, email, tipo

### Headers Necessários

```
Authorization: Bearer <token>
Content-Type: application/json
```

### Códigos de Status HTTP

- **200**: Sucesso
- **201**: Criado
- **400**: Bad Request
- **401**: Não autorizado
- **403**: Proibido
- **404**: Não encontrado
- **422**: Validação falhou
- **500**: Erro interno

## 📝 Padrão de Resposta da API

### Sucesso

```json
{
  "success": true,
  "data": {
    // dados da resposta
  },
  "message": "Operação realizada com sucesso"
}
```

### Erro

```json
{
  "success": false,
  "message": "Mensagem de erro",
  "errors": ["Campo obrigatório", "Formato inválido"]
}
```

### Paginação

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente Necessárias

```env
# Banco de Dados
DATABASE_URL=postgresql://user:password@localhost:5432/frimil
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=frimil
DATABASE_USER=user
DATABASE_PASSWORD=password

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Servidor
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:4200

# Upload (opcional)
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

## 🚀 Como Iniciar o Desenvolvimento

### 1. Configuração Inicial

```bash
# Clonar o repositório
git clone <repository-url>
cd frimil-backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# Executar migrações
npm run migrate

# Executar seeds (dados iniciais)
npm run seed
```

### 2. Comandos de Desenvolvimento

```bash
# Executar em modo desenvolvimento
npm run dev

# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Build para produção
npm run build

# Executar em produção
npm start
```

### 3. Comandos de Banco de Dados

```bash
# Criar migração
npm run migrate:create -- nome-da-migracao

# Executar migrações
npm run migrate

# Reverter migração
npm run migrate:rollback

# Executar seeds
npm run seed
```

## 🧪 Testes

### Estrutura de Testes

```
tests/
├── unit/           # Testes unitários
├── integration/    # Testes de integração
├── e2e/           # Testes end-to-end
└── fixtures/      # Dados de teste
```

### Comandos de Teste

```bash
# Executar todos os testes
npm test

# Executar testes unitários
npm run test:unit

# Executar testes de integração
npm run test:integration

# Executar testes e2e
npm run test:e2e

# Cobertura de código
npm run test:coverage
```

## 📦 Deploy

### Docker

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/frimil
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=frimil
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 🔍 Monitoramento e Logs

### Logs Necessários

- Requisições HTTP (método, URL, status, tempo)
- Erros de autenticação
- Operações CRUD
- Performance de queries
- Erros de validação

### Métricas Importantes

- Tempo de resposta da API
- Taxa de erro
- Uso de memória e CPU
- Conexões de banco de dados
- Requisições por minuto

## 🔒 Segurança

### Implementações Necessárias

- Validação de entrada
- Sanitização de dados
- Rate limiting
- CORS configurado
- Helmet.js para headers de segurança
- Validação de JWT
- Hash de senhas (bcrypt)
- Logs de auditoria

### Validações

- CPF válido
- Email válido
- Telefone válido
- CEP válido
- Coordenadas geográficas válidas

## 📞 Comunicação

### Endpoints de Health Check

```
GET /health
GET /health/db
GET /health/redis
```

### Webhooks (opcional)

```
POST /webhooks/notification
POST /webhooks/audit
```

## 🎯 Próximos Passos

1. **Implementar autenticação JWT**
2. **Criar CRUD completo para todas as entidades**
3. **Implementar validações**
4. **Configurar logs e monitoramento**
5. **Implementar testes**
6. **Configurar CI/CD**
7. **Documentar APIs (Swagger/OpenAPI)**
8. **Implementar cache (Redis)**
9. **Configurar backup automático**
10. **Implementar auditoria**

## 📞 Contato

Para dúvidas sobre o frontend ou integração:

- **Email**: dev@frimil.com.br
- **Documentação**: [Link para documentação]
- **Repositório**: [Link para repositório]

---

**Última atualização**: Dezembro 2024
**Versão**: 1.0.0
