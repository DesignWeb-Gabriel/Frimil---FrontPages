export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
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
    profile: true,
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
  },
  dateFormat: 'dd/MM/yyyy',
  dateTimeFormat: 'dd/MM/yyyy HH:mm',
};
