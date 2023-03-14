import type { Suggestion } from '@Types/suggestion';

export interface DataProps {
    data: {
        suggestions: Suggestion[]
    }
}

export interface TellUsProps {
    suggestions: Suggestion[]
}