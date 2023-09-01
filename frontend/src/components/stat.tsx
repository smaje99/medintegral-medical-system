import { AnimatedNumbers } from '@/components/ui/animated-numbers';
import { cn } from '@/lib/utils';

type Props = {
  readonly stat: number;
  readonly message: string;
  readonly isMajor: boolean;
};

export const Stat: React.FC<Props> = ({ stat, message, isMajor = false }) => (
  <section
    className={cn(
      'max-h-max grid grid-cols-1 grid-rows-2 items-center justify-items-center gap-2',
    )}
  >
    <span
      className={cn(
        'inline-block',
        'text-3xl font-bold text-white dark:text-black md:text-5xl',
      )}
    >
      <AnimatedNumbers value={stat} />
      {isMajor ? '+' : ''}
    </span>
    <span
      className={cn(
        'text-base text-center font-normal leading-none',
        'text-white/70 dark:text-black/70',
      )}
    >
      {message}
    </span>
  </section>
);
