import { GiCheckMark } from 'react-icons/gi';

import { PublicLayout } from '@/components/layouts';
import { ethicalPrinciples, styles } from '@/modules/About';
import type { NextPageWithLayout } from '@/types/next';

const About: NextPageWithLayout = () => {
  return (
    <main className={styles.about}>
      <section className={styles.section}>
        <h2 className={styles.title}>Reseña Histórica</h2>
        <p className={styles.paragraph}>
          <strong>MEDICINA INTEGRAL DEL CAQUETÁ IPS S.A.S</strong>, fue creada
          inicialmente como <strong>Centro Médico</strong> en el año 2007, con el objetivo
          de prestar servicios de <strong>Medicina General y Alternativa</strong> a la
          población caqueteña.
        </p>
        <p className={styles.paragraph}>
          <strong>MEDINTEGRAL IPS S.A.S</strong> es una empresa privada con personería
          jurídica, patrimonio propio y autonomía administrativa inscrita en el{' '}
          <strong>
            Registro Especial de Prestadores de Servicios de Salud de Nivel I
          </strong>
          , teniendo como jurisdicción el Municipio de Florencia.
        </p>
        <p className={styles.paragraph}>
          En el mes de agosto de 2010, se transforma a una{' '}
          <strong>Sociedad por Acciones Simplificadas S.A.S</strong>, ampliando su
          patrimonio y mejorando sus servicios.
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>Nuestra Misión</h2>
        <p className={styles.paragraph}>
          <strong>MEDINTEGRAL IPS S.A.S</strong>, tiene como responsabilidad social
          brindar excelentes de salud a la población del Caquetá, soportando en el talento
          humano calificado, la sensibilidad social, la ética, la calidad y el servicio al
          cliente; contribuyendo al mejoramiento de la calidad de sus clientes,
          colaboradores y comunidad.
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>Nuestra Visión</h2>
        <p className={styles.paragraph}>
          Seremos dentro de 5 años una empresa reconocida por la calidad y competencia en
          la presentación de los servicios de salud del primer nivel de atención, con el
          compromiso continuo de un equipo humano formado integralmente en conocimientos
          profesionales, técnicos y del servicio al cliente, con una sólida estructura
          administrativa y financiera que garantice unas adecuadas instalaciones, equipos
          y dotaciones dentro del ambiente armónico de trabajo.
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>Principios Éticos</h2>
        <ul className={styles.ethical_group}>
          {ethicalPrinciples.map((principle) => (
            <li key={principle} className={styles.ethical_principle}>
              <span>{principle}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>Principios Corporativos</h2>
        <ul className={styles.corporate_group}>
          <li className={styles.corporate_principle}>
            <div className={styles.corporate_item}>
              <GiCheckMark />
            </div>
            <p className={styles.paragraph}>
              Consideremos la calidad como pilar de la gestión para la excelencia, y el
              usuario, el objetivo principal de toda nuestra actividad. Reconocemos
              nuestra corresponsabilidad ética, moral, social y económica frente a todas
              las actividades que se desarrollan en nuestra institución, frente a la{' '}
              <strong>Comunidad</strong> y al{' '}
              <strong>Sistema de Seguridad Social en Salud</strong>.
            </p>
          </li>
          <li className={styles.corporate_principle}>
            <div className={styles.corporate_item}>
              <GiCheckMark />
            </div>
            <p className={styles.paragraph}>
              Creemos en el respeto al ser humano como individuo y en la equidad solidaria
              como base de una sociedad justa, en la paz como propuesta de reconciliación,
              para legitimar nuestra institución frente a la comunidad en general.
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
};

About.getLayout = (page) => <PublicLayout title='Quiénes somos'>{page}</PublicLayout>;

export default About;
