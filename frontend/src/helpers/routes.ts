export interface Route {
  readonly href: string;
  readonly name: string;
}

export const Routes = Object.freeze({
  Home: Object.freeze<Route>({ href: '/', name: 'Inicio' }),
});

export const AuthRoutes = Object.freeze({
  SignIn: Object.freeze<Route>({ href: '/login', name: 'Iniciar Sesión' }),
});
