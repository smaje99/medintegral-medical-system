const routes = {
    home: '/',
    appointment: '/appointment',
    services: '/services',
    aboutUs: '/#sobre-nosotros',
    login: '/login',
    about: '/about',
    bulletin: '/bulletin',
    socialParticipation: '/social-participation',
    suggestions: '/suggestions',
    dashboard: {
        home: '/dashboard',
        users: '/dashboard/users',
        user: dni => `/dashboard/users/${dni}`
    } as const
} as const;

export default routes;