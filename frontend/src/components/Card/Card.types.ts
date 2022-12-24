export interface ContentCardProps {
    readonly title: string;
    readonly content: string;
    readonly route: string;
}

export interface TellCardProps {
    opinion: string;
    created_at: Date;
}