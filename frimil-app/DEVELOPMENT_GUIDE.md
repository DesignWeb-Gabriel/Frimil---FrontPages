# Guia de Desenvolvimento - FRIMIL

## 🚀 Início Rápido

### 1. Configuração do Ambiente

```bash
# Verificar versão do Node.js (deve ser 18+)
node --version

# Verificar versão do npm
npm --version

# Instalar Angular CLI globalmente (se necessário)
npm install -g @angular/cli@20.1.3
```

### 2. Configuração do Projeto

```bash
# Clonar e configurar
git clone <repository-url>
cd frimil-app

# Instalar dependências
npm install

# Verificar se tudo está funcionando
npm start
```

## 🛠️ Comandos de Desenvolvimento

### Desenvolvimento

```bash
# Servidor de desenvolvimento
npm start                    # http://localhost:4200

# Build em modo watch
npm run watch

# Build para produção
npm run build

# Build com SSR
npm run build
npm run serve:ssr:frimil-app
```

### Testes

```bash
# Executar testes unitários
npm test

# Testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:coverage
```

### Linting e Formatação

```bash
# Verificar código
ng lint

# Formatar código
ng format
```

## 📁 Estrutura de Desenvolvimento

### Criando Novos Componentes

```bash
# Componente standalone
ng generate component features/nova-feature/components/nova-feature --standalone

# Serviço
ng generate service features/nova-feature/services/nova-feature

# Interface/Modelo
ng generate interface features/nova-feature/models/nova-feature
```

### Estrutura Recomendada para Features

```
features/nova-feature/
├── components/
│   ├── nova-feature.component.ts
│   ├── nova-feature.component.scss
│   └── nova-feature.component.spec.ts
├── models/
│   └── nova-feature.model.ts
├── services/
│   └── nova-feature.service.ts
└── nova-feature.routes.ts
```

## 🔧 Configurações Importantes

### TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "target": "ES2022"
  }
}
```

### Angular (angular.json)

- **Inline Style Language**: SCSS
- **Assets**: Pasta `public/`
- **SSR**: Habilitado
- **Output Mode**: Server

## 🎨 Padrões de Código

### Nomenclatura

```typescript
// Componentes
export class NovaFeatureComponent {}

// Serviços
export class NovaFeatureService {}

// Interfaces
export interface NovaFeature {}

// Arquivos
nova - feature.component.ts;
nova - feature.service.ts;
nova - feature.model.ts;
```

### Estrutura de Componente

```typescript
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-nova-feature",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./nova-feature.component.html",
  styleUrls: ["./nova-feature.component.scss"],
})
export class NovaFeatureComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
```

### Estrutura de Serviço

```typescript
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class NovaFeatureService {
  private apiUrl = `${environment.apiUrl}/nova-feature`;

  constructor(private http: HttpClient) {}

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
```

## 🔌 Integração com APIs

### Configuração de Interceptors

```typescript
// app.config.ts
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { errorInterceptor } from "./core/interceptors/error.interceptor";
import { loadingInterceptor } from "./core/interceptors/loading.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor]))],
};
```

### Padrão de Requisições

```typescript
// Serviço com tratamento de erro
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/data`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error("Erro na requisição:", error);
    return throwError(() => new Error("Erro na requisição"));
  }
}
```

## 🎯 State Management

### AppStateService

```typescript
@Injectable({
  providedIn: "root",
})
export class AppStateService {
  private pecuaristasSubject = new BehaviorSubject<Pecuarista[]>([]);
  public pecuaristas$ = this.pecuaristasSubject.asObservable();

  updatePecuaristas(pecuaristas: Pecuarista[]): void {
    this.pecuaristasSubject.next(pecuaristas);
  }
}
```

### Uso em Componentes

```typescript
export class PecuaristaComponent {
  pecuaristas$ = this.appState.pecuaristas$;

  constructor(private appState: AppStateService) {}

  loadPecuaristas(): void {
    this.pecuaristaService.getPecuaristas().subscribe((data) => {
      this.appState.updatePecuaristas(data);
    });
  }
}
```

## 🧪 Testes

### Teste de Componente

```typescript
describe("NovaFeatureComponent", () => {
  let component: NovaFeatureComponent;
  let fixture: ComponentFixture<NovaFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NovaFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
```

### Teste de Serviço

```typescript
describe("NovaFeatureService", () => {
  let service: NovaFeatureService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NovaFeatureService],
    });
    service = TestBed.inject(NovaFeatureService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
```

## 🎨 Estilização

### SCSS Global

```scss
// styles.scss
@use "@angular/material" as mat;

// Variáveis globais
:root {
  --primary-color: #1976d2;
  --secondary-color: #dc004e;
  --background-color: #fafafa;
}

// Estilos globais
body {
  margin: 0;
  font-family: Roboto, sans-serif;
  background-color: var(--background-color);
}
```

### Estilos de Componente

```scss
// nova-feature.component.scss
.nova-feature {
  &__container {
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__title {
    color: var(--primary-color);
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}
```

## 🔒 Segurança

### Guards de Rota

```typescript
@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}
```

### Validação de Formulários

```typescript
export class NovaFeatureComponent {
  form = new FormGroup({
    nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  onSubmit(): void {
    if (this.form.valid) {
      // Processar formulário
    }
  }
}
```

## 📦 Deploy

### Build de Produção

```bash
# Build otimizado
npm run build --configuration production

# Verificar arquivos gerados
ls -la dist/frimil-app/browser/
```

### Deploy com SSR

```bash
# Build completo
npm run build

# Executar servidor SSR
npm run serve:ssr:frimil-app
```

### Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist/frimil-app/server ./server
COPY --from=builder /app/dist/frimil-app/browser ./browser
EXPOSE 4000
CMD ["node", "server/server.mjs"]
```

## 🐛 Debugging

### Console Logs

```typescript
// Desenvolvimento
console.log("Debug:", data);

// Produção (remover)
// console.log('Debug:', data);
```

### Angular DevTools

- Instalar extensão do Chrome
- Usar para inspecionar componentes
- Verificar estado da aplicação

### Network Tab

- Verificar requisições HTTP
- Analisar headers e payloads
- Identificar problemas de CORS

## 📚 Recursos Úteis

### Documentação

- [Angular Documentation](https://angular.dev/)
- [Angular Material](https://material.angular.io/)
- [RxJS Documentation](https://rxjs.dev/)

### Ferramentas

- [Angular CLI](https://angular.io/cli)
- [Angular DevTools](https://angular.io/devtools)
- [TypeScript Playground](https://www.typescriptlang.org/play)

### Extensões VS Code

- Angular Language Service
- Angular Snippets
- TypeScript Importer
- Prettier
- ESLint

## 🚨 Troubleshooting

### Problemas Comuns

#### Erro de CORS

```typescript
// Adicionar no backend
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
```

#### Erro de Build

```bash
# Limpar cache
npm run clean
rm -rf node_modules
npm install
```

#### Erro de Dependências

```bash
# Verificar versões
npm outdated
npm audit

# Atualizar dependências
npm update
```

## 📞 Suporte

### Antes de Pedir Ajuda

1. Verificar documentação
2. Procurar em issues existentes
3. Testar em ambiente limpo
4. Verificar logs de erro

### Informações para Reportar Bug

- Versão do Node.js
- Versão do Angular
- Sistema operacional
- Passos para reproduzir
- Logs de erro
- Screenshots (se aplicável)

---

**Última atualização**: Agosto 2025
**Versão**: 1.0.0
