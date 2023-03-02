import routes from './routes';

const navigation = [
    {
        role: 'usuarios',
        name: 'Usuarios',
        route: routes.dashboard.users
    } as const
] as const;

export default navigation;