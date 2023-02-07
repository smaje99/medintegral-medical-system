export interface Suggestion {
    readonly id: string;
    readonly opinion: string;
    readonly pinned: boolean;
    readonly createdAt: Date;
}

export type SuggestionCreate = Pick<Suggestion, 'opinion'>