import { cn } from '@/lib/utils';

export const Maps: React.FC<{ className?: string }> = ({ className }) => (
  <iframe
    // eslint-disable-next-line max-len
    src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d419.2123749909802!2d-75.60564439844012!3d1.6102728073193509!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e244e1170da17c3%3A0xbfe7d0169649cf8f!2sCra.%2010%20%235b-27%2029%2C%20Florencia%2C%20Caquet%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sus!4v1694153370959!5m2!1ses!2sus'
    width='400'
    height='300'
    className={cn('border-0 shadow-sm', className)}
    allowFullScreen={true}
    loading='lazy'
    referrerPolicy='no-referrer-when-downgrade'
    aria-label='Mapa de la ubicación de Medintegral IPS S.A.S'
    title='Mapa de la ubicación de Medintegral IPS S.A.S'
  ></iframe>
);
