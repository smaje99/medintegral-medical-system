export interface BadgeProps extends React.HTMLProps<HTMLSpanElement> {
    color: 'green' | 'blue' | 'green-blue';
    onClose?: (item: string) => void;
    titleClose?: string;
    children: React.ReactNode;
}