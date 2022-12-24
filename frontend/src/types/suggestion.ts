export interface Suggestion {
    readonly id: string;
    readonly opinion: string;
    readonly pinned: boolean;
    readonly created_at: Date;
}

export type SuggestionCreate = Pick<Suggestion, 'opinion'>