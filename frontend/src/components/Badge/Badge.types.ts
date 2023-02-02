export interface BadgeProps extends React.HTMLProps<HTMLSpanElement> {
    color: 'green' | 'blue' | 'green-blue';
    children: React.ReactNode;
}