import {
  IconAffiliate,
  IconArticle,
  IconBrandWhatsapp,
  IconBuildingHospital,
  IconCalendarTime,
  IconDeviceMobile,
  IconMail,
  IconMapPin,
  IconPhone,
  IconStethoscope,
  IconUsers,
} from '@tabler/icons-react';
import Link, { type LinkProps } from 'next/link';
import {
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type LiHTMLAttributes,
} from 'react';

import { MedintegralRights } from '@/components/footer/rights-footer';
import { Maps } from '@/components/maps';
import { ContactRoutes, Routes } from '@/helpers/routes';
import { cn } from '@/lib/utils';

type InfoProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

const Info: React.FC<InfoProps> = ({ title, className, children }) => (
  <section className={cn('grid gap-3 content-start', className)}>
    <h3 className='text-lg font-bold'>{title}</h3>
    {children}
  </section>
);

const InfoGroup: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
> = ({ className, ...props }) => (
  <ul className={cn('grid pl-0 gap-3 list-none', className)} {...props} />
);

const InfoItem: React.FC<
  DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
> = ({ className, ...props }) => (
  <li className={cn('text-base font-medium tracking-wide', className)} {...props} />
);

const InfoItemLink: React.FC<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps & { children?: React.ReactNode }
> = ({ className, ...props }) => (
  <InfoItem>
    <Link
      className={cn(
        `
        inline-flex gap-1
        hover:font-semibold
        hover:text-primary-700
        dark:hover:text-foreground/80
        active:text-primary-400
        dark:active:text-primary-500
        transition-colors
        `,
        className,
      )}
      {...props}
    />
    <a />
  </InfoItem>
);

const MedintegralLogo = () => (
  <div
    className={
      'bg-medintegral h-[max(8rem,_10vh)] w-full bg-center bg-no-repeat drop-shadow-lg'
    }
    aria-label='Logo de Medintegral IPS S.A.S'
  ></div>
);

export const InfoFooter: React.FC = () => (
  <footer className='mx-2 mb-6 mt-20 grid gap-10'>
    <section
      className={cn(`
        w-4/5
        mx-auto
        grid
        justify-center
        justify-items-start
        gap-x-5 gap-y-12
        grid-flow-dense
        auto-rows-[max-content]
        grid-cols-[repeat(auto-fit,_minmax(14rem,_1fr))]
        overflow-x-hidden
      `)}
    >
      <Info title='Sobre nosotros'>
        <InfoGroup>
          <InfoItemLink href={Routes.About.href}>
            <IconBuildingHospital className='text-secondary-600' />
            {Routes.About.name}
          </InfoItemLink>
          <InfoItemLink href={Routes.Services.href}>
            <IconStethoscope className='text-secondary-600' />
            Nuestros servicios
          </InfoItemLink>
          <InfoItemLink href={Routes.Team.href}>
            <IconUsers className='text-secondary-600' />
            Nuestro equipo
          </InfoItemLink>
          <InfoItemLink href={Routes.Bulletin.href}>
            <IconArticle className='text-secondary-600' />
            Boletín
          </InfoItemLink>
          <InfoItemLink href={Routes.SocialParticipation.href}>
            <IconAffiliate className='text-secondary-600' />
            Participación Social
          </InfoItemLink>
        </InfoGroup>
      </Info>

      <Info title='Horario de atención'>
        <InfoGroup>
          <InfoItem className='inline-flex gap-1'>
            <IconCalendarTime className='text-secondary-600' />
            <span>
              <strong>Lunes a Viernes</strong>
              <br />
              7:00 a.m. - 12:00 m.
              <br />
              2:00 p.m. - 6:00 p.m.
            </span>
          </InfoItem>
          <InfoItem className='inline-flex gap-1'>
            <IconCalendarTime className='text-secondary-600' />
            <span>
              <strong>Sábado</strong>
              <br />
              9:00 a.m. - 12:00 m.
            </span>
          </InfoItem>
        </InfoGroup>
      </Info>

      <Info title='Contáctenos'>
        <InfoGroup>
          <InfoItemLink
            href={ContactRoutes.WhatsApp.href}
            title={ContactRoutes.WhatsApp.name}
            target='_blank'
          >
            <IconBrandWhatsapp className='text-secondary-600' />
            Escríbenos (310 580 3056)
          </InfoItemLink>

          <InfoItemLink
            href={ContactRoutes.Cellphone.href}
            aria-label={ContactRoutes.Cellphone.name}
          >
            <IconDeviceMobile className='text-secondary-600' />
            Llámanos (311 504 5647)
          </InfoItemLink>

          <InfoItemLink
            href={ContactRoutes.Telephone.href}
            aria-label={ContactRoutes.Telephone.name}
          >
            <IconPhone className='text-secondary-600' />
            Llámanos ((608) 435 57 11)
          </InfoItemLink>

          <InfoItemLink
            href={ContactRoutes.Email.href}
            aria-label={ContactRoutes.Email.name}
            target='_blank'
          >
            <IconMail className='text-secondary-600' />
            Envíanos un correo
          </InfoItemLink>

          <InfoItemLink
            href={ContactRoutes.Location.href}
            title={ContactRoutes.Location.name}
            aria-label={ContactRoutes.Location.name}
            target='_blank'
          >
            <IconMapPin className='text-secondary-600' />
            Cra. 10 # 5A - 25 29
            <br />
            Barrio La Avenidas
            <br />
            Florencia - Caquetá
            <br />
            Frente a Medicina Legal
            <br />
          </InfoItemLink>
        </InfoGroup>
      </Info>

      <Maps
        className={
          'w-full min-[910px]:col-span-full min-[1210px]:col-auto 2xl:col-span-2'
        }
      />
    </section>

    <MedintegralLogo />

    <MedintegralRights />
  </footer>
);
