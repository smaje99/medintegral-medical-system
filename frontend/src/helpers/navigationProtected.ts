import routes from './routes';

const navigation = {
    'usuarios': {
        name: 'Usuarios',
        route: routes.dashboard.users
    } as const
} as const;

export default navigation;