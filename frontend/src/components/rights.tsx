const currentYear = new Date().getFullYear();

export const MedintegralRights: React.FC = () => (
  <small className='inline-block w-full select-none text-center text-xs tracking-wide'>
    &copy; {currentYear} - Medicina Integral del Caquetá IPS S.A.S
  </small>
);
