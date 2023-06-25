import routes from './routes';

const navigation = [
  { name: 'Servicios', route: routes.services } as const,
  { name: 'Citas', route: routes.appointment } as const,
  { name: 'Sobre nosotros', route: routes.aboutUs } as const,
] as const;

export default navigation;
