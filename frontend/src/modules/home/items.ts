import routes from '@Helpers/routes';

const items = [
    {
        title: 'Quiénes Somos',
        content: 'Conoce sobre nosotros y nuestra labor',
        route: routes.about
    } as const,
    {
        title: 'Servicios',
        content: 'Conoce nuestro portafolio de servicios médicos',
        route: routes.services
    } as const,
    {
        title: 'Boletín',
        content: 'Infórmate con nuestras publicaciones',
        route: routes.bulletin
    } as const,
    {
        title: 'Participación social',
        content: 'Conoce nuestro participación social',
        route: routes.socialParticipation
    } as const,
    {
        title: 'Citas',
        content: 'Agenda y consulta tus cita médicas',
        route: routes.appointment
    } as const,
    {
        title: 'Sugerencias',
        content: 'Para nosotros es importante saber que piensas de nosotros',
        route: routes.suggestions
    } as const
] as const;

export default items;