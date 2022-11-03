import routes from '@Helpers/routes';

const items = [
    {
        title: 'Quiénes Somos',
        content: 'Conoce sobre nosotros y nuestra labor',
        route: routes.about
    },
    {
        title: 'Servicios',
        content: 'Conoce nuestro portafolio de servicios médicos',
        route: routes.services
    },
    {
        title: 'Boletín',
        content: 'Infórmate con nuestras publicaciones',
        route: routes.bulletin
    },
    {
        title: 'Participación social',
        content: 'Conoce nuestro participación social',
        route: routes.socialParticipation
    },
    {
        title: 'Citas',
        content: 'Agenda y consulta tus cita médicas',
        route: routes.appointment
    },
    {
        title: 'Sugerencias',
        content: 'Para nosotros es importante saber que piensas de nosotros',
        route: routes.suggestions
    }
]

export default items;