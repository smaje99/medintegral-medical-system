const currentYear = new Date().getFullYear();

const MedintegralRights: React.FC = () => (
  <span className='inline-block w-full select-none text-center text-xs tracking-wide'>
    &copy; {currentYear} - Medicina Integral del Caquetá IPS S.A.S
  </span>
);

export const RightsFooter: React.FC = () => (
  <footer className='mb-5 mt-14 box-border w-full'>
    <MedintegralRights />
  </footer>
);
