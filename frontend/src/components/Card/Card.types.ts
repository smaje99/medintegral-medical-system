import { Suggestion } from '@Types/suggestion';

export interface ContentCardProps {
    readonly title: string;
    readonly content: string;
    readonly route: string;
}

export interface TellCardProps extends Pick<Suggestion, 'opinion' | 'createdAt'> { }