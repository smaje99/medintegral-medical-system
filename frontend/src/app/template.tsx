import { InfoFooter } from '@/components/footer';
import { Navbar } from '@/components/navigation';

export default function Template({ children }: { readonly children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <InfoFooter />
    </>
  );
}
