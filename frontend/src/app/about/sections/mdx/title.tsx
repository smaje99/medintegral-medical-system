type Props = {
  readonly children: React.ReactNode;
};

export const Title: React.FC<Props> = ({ children }) => {
  return <h1 className='text-balance text-foreground'>{children}</h1>;
};
