import ObjectCallable from '@Utils/objectCallable';

const routes = Object.freeze({
    home: '/',
    appointment: '/appointment',
    services: '/services',
    aboutUs: '/#sobre-nosotros',
    login: '/login',
    about: '/about',
    bulletin: '/bulletin',
    socialParticipation: '/social-participation',
    suggestions: '/suggestions',
    dashboard: ObjectCallable({
        __call__: () => '/dashboard',
        users: '/dashboard/usuarios'
    })
})

export default routes;