export interface Route {
  readonly href: string;
  readonly name: string;
}

export const Routes = Object.freeze({
  Home: Object.freeze<Route>({ href: '/', name: 'Inicio' }),
  About: Object.freeze<Route>({ href: '/about', name: '¿Quiénes somos?' }),
  Services: Object.freeze<Route>({ href: '/services', name: 'Servicios' }),
  Team: Object.freeze<Route>({ href: '/team', name: 'Equipo' }),
  Bulletin: Object.freeze<Route>({ href: '/bulletin', name: 'Boletín' }),
  SocialParticipation: Object.freeze<Route>({
    href: '/social-participation',
    name: 'Participación Social',
  }),
});

export const AuthRoutes = Object.freeze({
  SignIn: Object.freeze<Route>({ href: '/login', name: 'Iniciar Sesión' }),
});

export const ContactRoutes = Object.freeze({
  WhatsApp: Object.freeze<Route>({
    href: 'https://wa.me/573105803056',
    name: 'WhatsApp',
  }),
  Email: Object.freeze<Route>({
    href: 'mailto:medintegralflorencia@gmail.com',
    name: 'Correo electrónico',
  }),
  Telephone: Object.freeze<Route>({
    href: 'tel:+576084355711',
    name: 'Número telefónico',
  }),
  Cellphone: Object.freeze<Route>({
    href: 'tel:+573115045647',
    name: 'Número de celular',
  }),
  Location: Object.freeze<Route>({
    href: 'https://goo.gl/maps/vtpD39tPnLGEq2cg9',
    name: 'Ubicación en Google Maps',
  }),
});

export const CmsRoutes = Object.freeze({
  Dashboard: Object.freeze<Route>({ href: '/dashboard', name: 'Dashboard' }),
  Users: Object.freeze<Route>({ href: '/users', name: 'Usuarios' }),
});
