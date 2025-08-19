export const environment = {
  production: true,
  apiUrl: 'https://api.frimil.com.br/api',
  appName: 'FRIMIL',
  version: '1.0.0',
  defaultLanguage: 'pt-BR',
  supportedLanguages: ['pt-BR', 'en'],
  features: {
    dashboard: true,
    pecuarista: true,
    fazenda: true,
    pesadorGado: true,
    transportador: true,
    profile: true
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50]
  },
  dateFormat: 'dd/MM/yyyy',
  dateTimeFormat: 'dd/MM/yyyy HH:mm'
};
