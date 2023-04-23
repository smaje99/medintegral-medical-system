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
        user: (dni: number | string) => `/dashboard/users/${dni}`,
        specialties: '/dashboard/specialties',
        specialty: (id: string) => `/dashboard/specialties/${id}`
    } as const
} as const;

export default routes;